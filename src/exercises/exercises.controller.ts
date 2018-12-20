import { Controller, Post, Body, UsePipes, Patch, Get, Headers, Query, Delete, HttpCode, Param } from '@nestjs/common';
import { Exercise } from '../models/Exercise';
import { JsonApiDocumentPipe } from '../pipes/JsonApiDocumentPipe';
import { serializeToJsonApi } from '../models/JsonApi';
import { RequestObject } from '../models/RequestObject';
import { ExerciseService } from './ExerciseService';
import { SetsService } from '../sets/SetsService';

@Controller('exercises')
export class ExercisesController {

	constructor(
		private readonly exerciseService: ExerciseService,
		private readonly setService: SetsService
	) {}

	@Get()
	public async getAll(@Headers('userid') userId: string, @Query('workoutid') workoutId: string) {
		const exercises = await this.exerciseService.findByWorkout(workoutId);
		return serializeToJsonApi(exercises, 'exercise');
	}

	@Post()
	@UsePipes(JsonApiDocumentPipe)
	public async create(@Body() body: RequestObject<Exercise>) {
		const exercise = await this.exerciseService.create(body.model);
		return serializeToJsonApi(exercise, body.type);
	}

	@Patch(':id')
	@UsePipes(JsonApiDocumentPipe)
	public async softUpdate(@Body() body: RequestObject<Exercise>) {
		const exercise = await this.exerciseService.update(body.model);
		return serializeToJsonApi(exercise, body.type);
	}

	@Delete(':id')
	@HttpCode(204)
	public async delete(@Param('id') id: string) {

		const [sets] = await Promise.all([
			this.setService.findByExercise(id),
			this.exerciseService.delete(id)
		]);

		if(sets.length > 0) {
			await this.setService.deleteMany(sets.map(x => x.id));
		}

		return;
	}
}
