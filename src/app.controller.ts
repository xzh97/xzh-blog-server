import { Controller, Get, Post, UploadedFile } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('upload')
  uploadFile(@UploadedFile() file: Express.Multer.File): string {
    return this.appService.uploadFile(file);
  }
}
