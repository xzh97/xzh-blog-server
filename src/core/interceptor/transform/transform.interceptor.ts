import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonResponse } from './interface';

/**
 * @desc 请求成功后返回统一格式
 */
@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, CommonResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<CommonResponse<T>> {
    return next.handle().pipe(map(data => ({ code: 0, message: 'success', data })));
  }
}
