import { Controller, Post, Body, UsePipes, Patch, Get, Delete, Param, HttpCode } from '@nestjs/common';
import { JsonApiDocumentPipe } from '../pipes/JsonApiDocumentPipe';
import { Set } from '../models/Set';
import { RequestObject } from '../models/RequestObject';
import { serializeToJsonApi } from '../models/JsonApi';
import { SetsService } from './SetsService';

@Controller('sets')
export class SetsController {

	constructor(private readonly setsService: SetsService) {}

	@Get(':id')
	public async get(@Param('id') id: string) {
		const theSet = await this.setsService.findById(id);
		return serializeToJsonApi(theSet, 'set');
	}

	@Post()
	@UsePipes(JsonApiDocumentPipe)
	public async create(@Body() body: RequestObject<Set>) {
		const createdSet = await this.setsService.create(body.model);
		return serializeToJsonApi(createdSet, body.type);
	}

	@Patch(':id')
	@UsePipes(JsonApiDocumentPipe)
	public async update(@Body() body: RequestObject<Set>) {
		const set = await this.setsService.update(body.model);
		return serializeToJsonApi(set, body.type);
	}

	@Delete(':id')
	@HttpCode(204)
	public async delete(@Param('id') id: string) {
		await this.setsService.delete(id);
		//Need to return an empty body since our http code is 204
		return;
	}
}
