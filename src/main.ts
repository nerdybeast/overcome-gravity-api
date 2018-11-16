import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import { ConfigService } from './config/config.service';
import { ConfigModule } from './config/config.module';

async function bootstrap() {

	const app = await NestFactory.create(AppModule);
	const configService = app.select(ConfigModule).get(ConfigService);

	//https://www.npmjs.com/package/body-parser#bodyparserjsonoptions
	app.use(bodyParser.json({
		type: ['application/json', 'application/vnd.api+json']
	}));

	//https://www.npmjs.com/package/morgan#dev
	app.use(morgan('dev'));
	
	app.enableCors();
	
	//TODO: Config this port number
	await app.listen(configService.PORT, () => console.log(`Server listening on port ${configService.PORT}`));
}

bootstrap();
