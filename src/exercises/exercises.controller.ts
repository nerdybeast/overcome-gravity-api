import { Controller, Post, Body, UsePipes, Patch, Get, Headers, Query } from '@nestjs/common';
import { Exercise } from '../models/Exercise';
import { JsonApiDocumentPipe } from '../pipes/JsonApiDocumentPipe';
import { serializeToJsonApi } from '../models/JsonApi';
import { RequestObject } from '../models/RequestObject';
import { ExerciseService } from './ExerciseService';

@Controller('exercises')
export class ExercisesController {

	constructor(private readonly exerciseService: ExerciseService) {}

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
}
