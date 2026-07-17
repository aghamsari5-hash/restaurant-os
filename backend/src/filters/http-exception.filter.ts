import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let code = 'INTERNAL_SERVER_ERROR';
    let message = 'An unexpected error occurred';

    if (exception instanceof HttpException) {
      const exceptionResponse = exception.getResponse();
      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
        code = `HTTP_${status}`;
      } else if (
        typeof exceptionResponse === 'object' &&
        exceptionResponse !== null
      ) {
        const resObj = exceptionResponse as Record<string, unknown>;
        if (
          resObj.error &&
          typeof resObj.error === 'object' &&
          resObj.error !== null
        ) {
          const errObj = resObj.error as Record<string, unknown>;
          code =
            typeof errObj.code === 'string' ? errObj.code : `HTTP_${status}`;
          message =
            typeof errObj.message === 'string'
              ? errObj.message
              : exception.message;
        } else {
          code =
            typeof resObj.error === 'string' ? resObj.error : `HTTP_${status}`;
          message = Array.isArray(resObj.message)
            ? resObj.message.join(', ')
            : typeof resObj.message === 'string'
              ? resObj.message
              : exception.message;
        }
      }
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    const correlationId =
      (request.headers['x-correlation-id'] as string) || 'unknown';

    response.status(status).json({
      success: false,
      error: {
        code,
        message,
      },
      timestamp: new Date().toISOString(),
      correlationId,
    });
  }
}
