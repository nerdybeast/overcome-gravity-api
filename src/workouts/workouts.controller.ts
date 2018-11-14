import { Controller, Post, Patch, Body, UsePipes, Headers, Get, Param } from '@nestjs/common';
import { Workout } from '../models/Workout';
import { JsonApiDocumentPipe } from '../pipes/JsonApiDocumentPipe';
import { serializeToJsonApi, createDocument2, Relationships, JsonApiDto, Document } from '../models/JsonApi';
import { RequestObject } from '../models/RequestObject';
import { WorkoutService } from './WorkoutService';
import { ExerciseService } from '../exercises/ExerciseService';
import { SetsService } from '../sets/SetsService';
import { MaxService } from '../max/max.service';
import { Exercise } from '../models/Exercise';
import { Set } from '../models/Set';
import { Max } from '../models/Max';

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

		let includedDocuments: Document[] = [];

		maxes.forEach(max => includedDocuments.push(createDocument2(max, 'max')));

		const workoutDocuments: Document[] = workouts.map(wo => {
			const workoutDocument = this.createWorkoutDocument(wo, exercises, sets, maxes);
			workoutDocument.includedDocuments.forEach(x => includedDocuments.push(x));
			return workoutDocument.document;
		})

		const workoutsDto = new JsonApiDto(workoutDocuments);
		workoutsDto.included = includedDocuments;

		return workoutsDto;
	}

	@Get(':id')
	public async getById(@Headers('userid') userId: string, @Param('id') id: string) {

		const [workout, exercises, maxes] = await Promise.all([
			this.workoutService.findById(id),
			this.exerciseService.findByWorkout(id),
			this.maxService.findByUser(userId)
		]);

		const sets = await this.setsService.findByExercises(exercises.map(x => x.id));

		const workoutDocument: WorkoutDocument = this.createWorkoutDocument(workout, exercises, sets, maxes);
		const workoutDto = new JsonApiDto(workoutDocument.document);
		workoutDto.included = workoutDocument.includedDocuments;

		maxes.forEach(max => workoutDto.included.push(createDocument2(max, 'max')));

		return workoutDto;
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

	private createWorkoutDocument(workout: Workout, exercises: Exercise[], sets: Set[], maxes: Max[]) : WorkoutDocument {

		const includedDocuments: Document[] = [];

		const relatedExercises = exercises.filter(exercise => exercise.workout === workout.id);

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
		const woDoc = createDocument2(workout, 'workout', [relationships]);

		const workoutDocument = new WorkoutDocument();
		workoutDocument.document = woDoc;
		workoutDocument.includedDocuments = includedDocuments;

		return workoutDocument;
	}
}

class WorkoutDocument {
	public document: Document;
	public includedDocuments: Document[];
}
