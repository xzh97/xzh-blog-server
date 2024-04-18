import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('request...');
    console.log(req.method, req.baseUrl, req.query, req.params, req.body);
    // console.log(res);
    next();
  }
}
