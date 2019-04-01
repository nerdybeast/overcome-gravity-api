import { Module } from '@nestjs/common';
import { ExercisesController } from './exercises.controller';
import { ExerciseService } from './ExerciseService';
import { SetsModule } from '../sets/SetsModule';
import { MongooseModule } from '@nestjs/mongoose';
import { ExerciseSchema } from '../db/schemas/ExerciseSchema';

@Module({
	imports: [
		SetsModule,
		MongooseModule.forFeature([{
			name: 'Exercise',
			schema: ExerciseSchema
		}])
	],
	controllers: [ExercisesController],
	providers: [ExerciseService],
	exports: [ExerciseService]
})
export class ExercisesModule {}
