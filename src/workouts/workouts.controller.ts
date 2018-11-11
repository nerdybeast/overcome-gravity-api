import { Controller, Post, Patch, Body, UsePipes, Headers, Get } from '@nestjs/common';
import { Workout } from '../models/Workout';
import { JsonApiDocumentPipe } from '../pipes/JsonApiDocumentPipe';
import { serializeToJsonApi, createDocument, createDocument2, Relationships, JsonApiDto } from '../models/JsonApi';
import { RequestObject } from '../models/RequestObject';
import { WorkoutService } from './WorkoutService';
import { ExerciseService } from '../exercises/ExerciseService';
import { SetsService } from '../sets/SetsService';
import { MaxService } from '../max/max.service';

@Controller('workouts')
export class WorkoutsController {

	constructor(
		private readonly workoutService: WorkoutService,
		private readonly exerciseService: ExerciseService,
		private readonly setsService: SetsService,
		private readonly maxService: MaxService
	) {}

	@Get()
	public async getAll(@Headers('userid') userId: string) {

		const workouts = await this.workoutService.findByUser(userId);
		const workoutIds = workouts.map(workout => workout.id);

		const exercises = await this.exerciseService.findByWorkouts(workoutIds);
		const exerciseIds = exercises.map(exercise => exercise.id);
		
		const sets = await this.setsService.findByExercises(exerciseIds);
		const maxes = await this.maxService.findByUser(userId);

		let includedDocuments = [];

		maxes.forEach(max => includedDocuments.push(createDocument2(max, 'max')));

		const workoutDocuments = workouts.map(wo => {

			const relatedExercises = exercises.filter(exercise => exercise.workout === wo.id);

			relatedExercises.forEach(exercise => {

				const relatedSets = sets.filter(s => s.exercise === exercise.id);
				const relatedMax = maxes.find(max => max.id === exercise.max);

				relatedSets.forEach(s => includedDocuments.push(createDocument2(s, 'set')));

				const setRelationships = new Relationships('sets', 'set', relatedSets);
				const maxRelationships = new Relationships('max', 'max', relatedMax);
				
				const exerciseDoc = createDocument2(exercise, 'exercise', [setRelationships, maxRelationships]);
				includedDocuments.push(exerciseDoc);
			});

			const relationships = new Relationships('exercises', 'exercise', relatedExercises);
			const woDoc = createDocument2(wo, 'workout', [relationships]);

			return woDoc;
		})

		const workoutsDto = new JsonApiDto(workoutDocuments);
		workoutsDto.included = includedDocuments;

		return workoutsDto;
	}

	@Post()
	@UsePipes(JsonApiDocumentPipe)
	public async create(@Headers('userid') userId: string, @Body() body: RequestObject<Workout>) {
		const workout = await this.workoutService.create(userId, body.model);
		return serializeToJsonApi(workout, body.type);
	}

	@Patch(':id')
	@UsePipes(JsonApiDocumentPipe)
	public async patch(@Body() body: RequestObject<Workout>) {
		const workout = await this.workoutService.update(body.model);
		return serializeToJsonApi(workout, body.type);
	}
}
