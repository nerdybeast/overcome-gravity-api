import { Controller, Post, Patch, Body, UsePipes, Headers, Get } from '@nestjs/common';
import { Workout } from '../models/Workout';
import { JsonApiDocumentPipe } from '../pipes/JsonApiDocumentPipe';
import { serializeToJsonApi } from '../models/JsonApi';
import { RequestObject } from '../models/RequestObject';
import { WorkoutService } from './WorkoutService';

@Controller('workouts')
export class WorkoutsController {

	constructor(private readonly workoutService: WorkoutService) {}

	@Get()
	public async getAll(@Headers('userid') userId: string) {
		const workouts = await this.workoutService.findByUser(userId);
		return serializeToJsonApi(workouts, 'workout');
	}

	@Post()
	@UsePipes(JsonApiDocumentPipe)
	public async create(@Headers('userid') userId: string, @Body() body: RequestObject<Workout>) {
		const workout = await this.workoutService.create(userId, body.model);
		return serializeToJsonApi(workout, body.type);
	}

	@Patch(':id')
	@UsePipes(JsonApiDocumentPipe)
	softUpdate(@Body() body: RequestObject<Workout>) {
		return serializeToJsonApi(body.model, body.type);
	}
}
