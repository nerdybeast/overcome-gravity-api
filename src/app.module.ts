import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WorkoutsModule } from './workouts/workouts.module';
import { SetsController } from './sets/sets.controller';
import { ConfigModule } from './config/config.module';
import { MaxModule } from './max/max.module';
import { ExercisesModule } from './exercises/exercise.module';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionHandler } from './exception-handlers/GlobalExceptionHandler';
import { UncaughtHttpExceptionHandler } from './exception-handlers/UncaughtHttpExceptionHandler';
import { LoggingModule } from './LoggingModule';

@Module({
	imports: [

		WorkoutsModule,
		MaxModule,
		ExercisesModule,
		LoggingModule,

		//Gives access via dependency injection to the ConfigService
		ConfigModule
	],

	controllers: [AppController, SetsController],
	providers: [
		AppService, 
		{
			provide: APP_FILTER,
			useClass: GlobalExceptionHandler
		},
		{
			provide: APP_FILTER,
			useClass: UncaughtHttpExceptionHandler
		}
	]
})
export class AppModule {}
