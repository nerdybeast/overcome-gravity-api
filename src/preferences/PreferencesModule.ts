import { Module } from '@nestjs/common';
import { DatabaseModule } from '../db/DatabaseModule';
import { PreferencesController } from './PreferencesController';
import { PreferencesService } from './PreferencesService';

@Module({
	imports: [DatabaseModule],
	controllers: [PreferencesController],
	providers: [PreferencesService],
	exports: [PreferencesService]
})
export class PreferencesModule {}