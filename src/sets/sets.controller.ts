import { Controller, Post, Body, UsePipes, Patch, Get, Delete, Param, HttpCode } from '@nestjs/common';
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
	patchUpdate(@Body() body: RequestObject<Set>) {
		return serializeToJsonApi(body.model, body.type);
	}

	@Delete(':id')
	@HttpCode(204)
	delete(@Param('id') id: string) {
		console.log('Deleting Set =>', id);
		return;
	}
}
