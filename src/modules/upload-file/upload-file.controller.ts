import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { GoogleStorageProvider } from './providers/google-storage.provider';
import { UploadFileService } from './providers/upload-file.service';

@Controller('upload-file')
export class UploadFileController {
  constructor(
    private readonly g: GoogleStorageProvider,
    private readonly uploadFileService: UploadFileService,
  ) {}

  @Post('poster')
  @UseInterceptors(FileInterceptor('poster'))
  public async uploadPoster(@UploadedFile() poster: Express.Multer.File) {
    return await this.uploadFileService.uploadPoster(poster);
  }
}
