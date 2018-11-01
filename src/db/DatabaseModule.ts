import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { MaxSchema } from './schemas/MaxSchema';
import { WorkoutSchema } from './schemas/WorkoutSchema';

const BaseDBModule = MongooseModule.forRootAsync({
	imports: [ConfigModule],
	inject: [ConfigService],
	useFactory: async (configService: ConfigService) => ({

		uri: configService.MONGODB_URI,

		// DeprecationWarning: current URL string parser is deprecated, and will be removed in a future version. To use the new parser, pass option { useNewUrlParser: true } to MongoClient.connect.
		useNewUrlParser: true
	})
});

@Module({
	imports: [
		BaseDBModule,
		MongooseModule.forFeature([{
			name: 'Max',
			schema: MaxSchema
		}, {
			name: 'Workout',
			schema: WorkoutSchema
		}])
	]
})
export class DatabaseModule {}