import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WorkoutsModule } from './workouts/workouts.module';
import { SetsController } from './sets/sets.controller';
import { ConfigModule } from './config/config.module';
import { MaxModule } from './max/max.module';
import { ExercisesModule } from './exercises/exercise.module';

@Module({
	imports: [

		WorkoutsModule,
		MaxModule,
		ExercisesModule,

		//Gives access via dependency injection to the ConfigService
		ConfigModule
	],

	controllers: [AppController, SetsController],
	providers: [AppService]
})
export class AppModule {}
