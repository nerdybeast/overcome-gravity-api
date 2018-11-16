import { Module, Injectable } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import Rollbar from 'rollbar';

class RollbarLogRequest {
	public message: string;
	public err: Error;
	public custom?: any;
	public request: any;
}

@Injectable()
export class LoggingService {

	constructor(configService: ConfigService) {
		this.rollbar = new Rollbar({
			accessToken: configService.ROLLBAR_ACCESS_TOKEN
		});
	}

	private rollbar: Rollbar;

	public error(error: Error, httpRequest: any, customData: any = {}) : void {
		const logRequest = new RollbarLogRequest();
		logRequest.message = error.message;
		logRequest.err = error;
		logRequest.custom = customData;
		logRequest.request = httpRequest;
		this.log(logRequest);
	}

	private log(logRequest: RollbarLogRequest) : void {

		const message = logRequest.message || 'An unknown error has occured.';
		const custom = logRequest.custom || {};

		this.rollbar.log(message, logRequest.err, custom, logRequest.request, (rollbarError) => {

			if(rollbarError) {
				console.error('Failed to log error to Rollbar:', rollbarError, logRequest.err.name, logRequest.err.message);
				return;
			}

			console.log('Error successfully sent to Rollbar:', logRequest.err.name, logRequest.err.message);
		});
	}
}

@Module({
	imports: [ConfigModule],
	providers: [LoggingService],
	exports: [LoggingService]
})
export class LoggingModule {}
