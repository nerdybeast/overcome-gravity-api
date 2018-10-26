import { Controller, Post, Body, UsePipes, Patch } from '@nestjs/common';
import { Max } from '../models/Max';
import { JsonApiDocumentPipe } from '../pipes/JsonApiDocumentPipe';
import { serializeToJsonApi } from '../models/JsonApi';
import { RequestObject } from '../models/RequestObject';

@Controller('maxes')
export class MaxController {

	@Post()
	@UsePipes(JsonApiDocumentPipe)
	create(@Body() body: RequestObject<Max>) {
		body.model.id = (new Date().getTime()).toString();
		return serializeToJsonApi(body.model, body.type);
	}

	@Patch(':id')
	@UsePipes(JsonApiDocumentPipe)
	update(@Body() body: RequestObject<Max>) {
		return serializeToJsonApi(body.model, body.type);
	}

}
