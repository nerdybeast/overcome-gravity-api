import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { JsonApiErrorResponse, JsonApiError } from '../models/JsonApi';
import { LoggingService } from '../LoggingModule';

@Catch(HttpException)
export class UncaughtHttpExceptionHandler implements ExceptionFilter {

	constructor(private readonly logger: LoggingService) {}

	catch(exception: HttpException, host: ArgumentsHost) {

		let title;
		let details;

		if(typeof exception.message === 'string') {
			title = exception.message;
			details = exception.getResponse();
		} else {
			title = exception.message.error;
			details = exception.message.message;
		}

		const ctx: HttpArgumentsHost = host.switchToHttp();
		const request: any = ctx.getRequest();
		const response: any = ctx.getResponse();
		const status: any = exception.getStatus();

		const e = new Error(details);
		e.name = title;
		e.stack = exception.stack;
		this.logger.error(e, request);

		const jsonApiError = new JsonApiError();
		jsonApiError.title = title;
		jsonApiError.details = details;

		const errorResponse = new JsonApiErrorResponse();
		errorResponse.errors.push(jsonApiError);

		response.status(status).json(errorResponse);
	}
}