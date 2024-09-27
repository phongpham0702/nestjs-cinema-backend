import { Module } from '@nestjs/common';
import { GoogleStorageProvider } from './providers/google-storage.provider';


@Module({
  imports: [],
  providers: [GoogleStorageProvider]
})
export class UploadFileModule {}
