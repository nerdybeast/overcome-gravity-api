import { Module } from '@nestjs/common';
import { WorkoutsController } from './workouts.controller';
import { WorkoutService } from './WorkoutService';
import { ExercisesModule } from '../exercises/exercise.module';
import { SetsModule } from '../sets/SetsModule';
import { MaxModule } from '../max/max.module';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkoutSchema } from '../db/schemas/WorkoutSchema';

@Module({
	imports: [
		ExercisesModule,
		SetsModule,
		MaxModule,
		MongooseModule.forFeature([{
			name: 'Workout',
			schema: WorkoutSchema
		}])
	],
	controllers: [WorkoutsController],
	providers: [WorkoutService],
	exports: [WorkoutService]
})
export class WorkoutsModule {}
