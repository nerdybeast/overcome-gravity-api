import { Module } from '@nestjs/common';
import { SetsController } from './sets.controller';
import { SetsService } from './SetsService';
import { MongooseModule } from '@nestjs/mongoose';
import { SetSchema } from '../db/schemas/SetSchema';

@Module({
	imports: [
		MongooseModule.forFeature([{
			name: 'Set',
			schema: SetSchema
		}])
	],
	controllers: [SetsController],
	providers: [SetsService],
	exports: [SetsService]
})
export class SetsModule {}