import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WorkoutsModule } from './workouts/workouts.module';
import { ExercisesController } from './exercises/exercises.controller';
import { SetsController } from './sets/sets.controller';
import { MaxController } from './max/max.controller';
import { ConfigModule } from './config/config.module';

@Module({
	imports: [

		WorkoutsModule,

		//Gives access via dependency injection to the ConfigService
		ConfigModule
	],

	controllers: [AppController, ExercisesController, SetsController, MaxController],
	providers: [AppService]
})
export class AppModule {}
