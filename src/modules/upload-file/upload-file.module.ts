import { Module } from '@nestjs/common';
import { GoogleStorageProvider } from './providers/google-storage.provider';
import { UploadFileController } from './upload-file.controller';
import { UploadFileService } from './providers/upload-file.service';


@Module({
  providers: [GoogleStorageProvider, UploadFileService],
  controllers: [UploadFileController]
})
export class UploadFileModule {}
