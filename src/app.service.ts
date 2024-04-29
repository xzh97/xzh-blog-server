import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  uploadFile(file): string {
    return 'Hello World!';
  }
}
