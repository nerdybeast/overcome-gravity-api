import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WorkoutsModule } from './workouts/workouts.module';
import { ConfigModule } from './config/config.module';
import { MaxModule } from './max/max.module';
import { ExercisesModule } from './exercises/exercise.module';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionHandler } from './exception-handlers/GlobalExceptionHandler';
import { UncaughtHttpExceptionHandler } from './exception-handlers/UncaughtHttpExceptionHandler';
import { LoggingModule } from './LoggingModule';
import { PreferencesModule } from './preferences/PreferencesModule';
import { DatabaseModule } from './modules/database/DataBaseModule';
import { SetsModule } from './sets/SetsModule';

@Module({
	imports: [
		DatabaseModule,
		WorkoutsModule,
		MaxModule,
		ExercisesModule,
		SetsModule,
		LoggingModule,
		PreferencesModule,
		ConfigModule
	],
	controllers: [
		AppController
	],
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
