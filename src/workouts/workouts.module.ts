import { Module } from '@nestjs/common';
import { WorkoutsController } from './workouts.controller';
import { DatabaseModule } from '../db/DatabaseModule';
import { WorkoutService } from './WorkoutService';

@Module({
	imports: [DatabaseModule],
	controllers: [WorkoutsController],
	providers: [WorkoutService],
	exports: [WorkoutService]
})
export class WorkoutsModule {}
