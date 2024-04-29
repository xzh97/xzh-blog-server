import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const status = exception.getStatus();

    const errRes = {
      data: exception.getResponse(),
      message: exception.message,
      code: status,
    };

    res.status(200);
    res.header('Content-Type', 'application/json; charset=utf-8');
    res.send(errRes);
  }
}
