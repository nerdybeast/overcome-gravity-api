import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';

@Module({
	providers: [{
		provide: ConfigService,
		useFactory: () => {
			const { PORT, MONGODB_URI } = process.env;
			return new ConfigService({ PORT, MONGODB_URI });
		}
	}],
	exports: [ConfigService]
})
export class ConfigModule {}