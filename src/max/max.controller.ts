import { Controller, Post, Body, UsePipes, Patch, Headers, Get, HttpException, Param } from '@nestjs/common';
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
	public async getAllByUser(@Headers('userid') userId: string) {
		const maxes = await this.maxService.findByUser(userId);
		return serializeToJsonApi(maxes, 'max');
	}

	@Get(':id')
	public async get(@Param('id') id: string) {
		const max = await this.maxService.findById(id);
		return serializeToJsonApi(max, 'max');
	}

	@Post()
	@UsePipes(JsonApiDocumentPipe)
	public async create(@Headers('userid') userId: string, @Body() body: RequestObject<Max>) {
		const max = await this.maxService.create(userId, body.model);
		return serializeToJsonApi(max, body.type);
	}

	@Patch(':id')
	@UsePipes(JsonApiDocumentPipe)
	public async update(@Body() body: RequestObject<Max>) {
		const max = await this.maxService.update(body.model);
		return serializeToJsonApi(max, body.type);
	}

}
