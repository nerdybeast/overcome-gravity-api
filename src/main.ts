import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import bodyParser from 'body-parser';
import morgan from 'morgan';

async function bootstrap() {

	const app = await NestFactory.create(AppModule);

	//https://www.npmjs.com/package/body-parser#bodyparserjsonoptions
	app.use(bodyParser.json({
		type: ['application/json', 'application/vnd.api+json']
	}));

	//https://www.npmjs.com/package/morgan#dev
	app.use(morgan('dev'));
	
	app.enableCors();
	
	//TODO: Config this port number
	await app.listen(3000);
}

bootstrap();
