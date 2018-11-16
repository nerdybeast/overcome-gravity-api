import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';

@Module({
	providers: [{
		provide: ConfigService,
		useFactory: () => {
			const { PORT, MONGODB_URI, ROLLBAR_ACCESS_TOKEN } = process.env;
			return new ConfigService({ PORT, MONGODB_URI, ROLLBAR_ACCESS_TOKEN });
		}
	}],
	exports: [ConfigService]
})
export class ConfigModule {}