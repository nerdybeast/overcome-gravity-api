import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { JsonApiErrorResponse, JsonApiError } from '../models/JsonApi';
import { LoggingService } from '../LoggingModule';

@Catch()
export class GlobalExceptionHandler implements ExceptionFilter {

	constructor(private readonly logger: LoggingService) {}

	catch(exception: any, host: ArgumentsHost) {

		const { error, message } = exception.message;

		const ctx: HttpArgumentsHost = host.switchToHttp();
		const request: any = ctx.getRequest();
		const response: any = ctx.getResponse();
		const status: any = exception.getStatus();

		const e = new Error(message);
		e.name = error;
		e.stack = exception.stack;
		this.logger.error(e, request);

		const jsonApiError = new JsonApiError();
		jsonApiError.title = error;
		jsonApiError.details = message;

		const errorResponse = new JsonApiErrorResponse();
		errorResponse.errors.push(jsonApiError);

		response.status(status).json(errorResponse);
	}
}