import { Controller, Post, Patch, Body, UsePipes } from '@nestjs/common';
import { Workout } from '../models/Workout';
import { JsonApiDocumentPipe } from '../pipes/JsonApiDocumentPipe';
import { serializeToJsonApi } from '../models/JsonApi';
import { RequestObject } from '../models/RequestObject';

@Controller('workouts')
export class WorkoutsController {

	@Post()
	@UsePipes(JsonApiDocumentPipe)
	create(@Body() body: RequestObject<Workout>) {
		return new Promise(resolve => {
			setTimeout(() => {
				body.model.id = (new Date().getTime()).toString();
				return resolve(serializeToJsonApi(body.model, body.type));
			}, 2000);
		});
	}

	@Patch(':id')
	@UsePipes(JsonApiDocumentPipe)
	softUpdate(@Body() body: RequestObject<Workout>) {
		return serializeToJsonApi(body.model, body.type);
	}
}
