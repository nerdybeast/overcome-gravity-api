import { Module } from '@nestjs/common';
import { DatabaseModule } from '../db/DatabaseModule';
import { ExercisesController } from './exercises.controller';
import { ExerciseService } from './ExerciseService';

@Module({
	imports: [DatabaseModule],
	controllers: [ExercisesController],
	providers: [ExerciseService],
	exports: [ExerciseService]
})
export class ExercisesModule {}
