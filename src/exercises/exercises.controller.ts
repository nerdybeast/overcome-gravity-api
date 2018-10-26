import { Controller, Post, Body, UsePipes, Patch } from '@nestjs/common';
import { Exercise } from '../models/Exercise';
import { JsonApiDocumentPipe } from '../pipes/JsonApiDocumentPipe';
import { serializeToJsonApi } from '../models/JsonApi';
import { RequestObject } from '../models/RequestObject';

@Controller('exercises')
export class ExercisesController {

	@Post()
	@UsePipes(JsonApiDocumentPipe)
	create(@Body() body: RequestObject<Exercise>) {
		body.model.id = (new Date().getTime()).toString();
		return serializeToJsonApi(body.model, body.type);
	}

	@Patch(':id')
	@UsePipes(JsonApiDocumentPipe)
	softUpdate(@Body() body: RequestObject<Exercise>) {
		return serializeToJsonApi(body.model, body.type);
	}
}
