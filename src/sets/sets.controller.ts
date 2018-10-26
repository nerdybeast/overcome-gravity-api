import { Controller, Post, Body, UsePipes, Patch } from '@nestjs/common';
import { JsonApiDocumentPipe } from '../pipes/JsonApiDocumentPipe';
import { Set } from '../models/Set';
import { RequestObject } from '../models/RequestObject';
import { serializeToJsonApi } from '../models/JsonApi';

@Controller('sets')
export class SetsController {

	@Post()
	@UsePipes(JsonApiDocumentPipe)
	create(@Body() body: RequestObject<Set>) {
		body.model.id = (new Date().getTime()).toString();
		return serializeToJsonApi(body.model, body.type);
	}

	@Patch(':id')
	@UsePipes(JsonApiDocumentPipe)
	softUpdate(@Body() body: RequestObject<Set>) {
		return serializeToJsonApi(body.model, body.type);
	}
}
