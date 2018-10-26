import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WorkoutsModule } from './workouts/workouts.module';
import { ExercisesController } from './exercises/exercises.controller';
import { SetsController } from './sets/sets.controller';
import { MaxController } from './max/max.controller';

@Module({
  imports: [WorkoutsModule],
  controllers: [AppController, ExercisesController, SetsController, MaxController],
  providers: [AppService],
})
export class AppModule {}
