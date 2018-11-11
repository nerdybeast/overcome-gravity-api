import { Module } from '@nestjs/common';
import { WorkoutsController } from './workouts.controller';
import { DatabaseModule } from '../db/DatabaseModule';
import { WorkoutService } from './WorkoutService';
import { ExercisesModule } from '../exercises/exercise.module';
import { SetsModule } from '../sets/SetsModule';
import { MaxModule } from '../max/max.module';

@Module({

	//Imports modules that export the providers this module needs
	imports: [

		DatabaseModule,

		//This module exports the "ExerciseService" so we can dependency inject this service into the WorkoutService
		ExercisesModule,
		SetsModule,
		MaxModule
	],

	controllers: [WorkoutsController],
	providers: [WorkoutService],
	exports: [WorkoutService]
})
export class WorkoutsModule {}
