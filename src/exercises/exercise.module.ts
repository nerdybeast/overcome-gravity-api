import { Module } from '@nestjs/common';
import { DatabaseModule } from '../db/DatabaseModule';
import { ExercisesController } from './exercises.controller';
import { ExerciseService } from './ExerciseService';
import { SetsModule } from '../sets/SetsModule';

@Module({
	imports: [DatabaseModule, SetsModule],
	controllers: [ExercisesController],
	providers: [ExerciseService],
	exports: [ExerciseService]
})
export class ExercisesModule {}
