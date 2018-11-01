import { Controller, Post, Body, UsePipes, Patch, Headers, Get } from '@nestjs/common';
import { Max } from '../models/Max';
import { JsonApiDocumentPipe } from '../pipes/JsonApiDocumentPipe';
import { serializeToJsonApi } from '../models/JsonApi';
import { RequestObject } from '../models/RequestObject';
import { MaxService } from './max.service';

@Controller('maxes')
export class MaxController {

	private readonly maxService: MaxService;

	constructor(maxService: MaxService) {
		this.maxService = maxService;
	}

	@Get()
	async getAllByUser(@Headers('userid') userId: string) {
		const maxes = await this.maxService.findByUser(userId);
		return serializeToJsonApi(maxes, 'max');
	}

	@Post()
	@UsePipes(JsonApiDocumentPipe)
	async create(@Headers('userid') userId: string, @Body() body: RequestObject<Max>) {
		const max = await this.maxService.create(userId, body.model);
		return serializeToJsonApi(max, body.type);
	}

	@Patch(':id')
	@UsePipes(JsonApiDocumentPipe)
	update(@Body() body: RequestObject<Max>) {
		return serializeToJsonApi(body.model, body.type);
	}

}
