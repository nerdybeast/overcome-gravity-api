import { Module } from '@nestjs/common';
import { PreferencesController } from './PreferencesController';
import { PreferencesService } from './PreferencesService';
import { MongooseModule } from '@nestjs/mongoose';
import { PreferencesSchema } from '../db/schemas/PreferencesSchema';

@Module({
	imports: [
		MongooseModule.forFeature([{
			name: 'Preferences',
			schema: PreferencesSchema
		}])
	],
	controllers: [PreferencesController],
	providers: [PreferencesService],
	exports: [PreferencesService]
})
export class PreferencesModule {}