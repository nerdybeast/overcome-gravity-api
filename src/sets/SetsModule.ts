import { Module } from '@nestjs/common';
import { DatabaseModule } from '../db/DatabaseModule';
import { SetsController } from './sets.controller';
import { SetsService } from './SetsService';

@Module({
	imports: [
		DatabaseModule
	],
	controllers: [SetsController],
	providers: [SetsService],
	exports: [SetsService]
})
export class SetsModule {}