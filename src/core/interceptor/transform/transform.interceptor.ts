import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CommonResponse } from './interface';
@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, CommonResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<CommonResponse<T>> {
    return next.handle().pipe(
      map(
        data => ({ code: 0, message: 'success', data }),
        catchError(err => {
          // console.log(err);
          throw new HttpException(
            {
              code: err.getStatus(),
              message: err.message,
              data: null,
            },
            HttpStatus.BAD_GATEWAY
          );
        })
      )
    );
  }
}
