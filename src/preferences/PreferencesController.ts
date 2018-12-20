import { Controller, Get, Headers } from '@nestjs/common';
import { PreferencesService } from './PreferencesService';
import { serializeToJsonApi } from '../models/JsonApi';

@Controller('preferences')
export class PreferencesController {

	constructor(private readonly preferencesService: PreferencesService) {}

	@Get()
	public async getUserPreferences(@Headers('userid') userId: string) {
		const preferences = await this.preferencesService.findByUser(userId);
		return serializeToJsonApi(preferences, 'preferences');
	}
}