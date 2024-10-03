import { Module } from '@nestjs/common';
import { GoogleStorageProvider } from './providers/google-storage.provider';
import { FileStorageService } from './providers/file-storage.service';

@Module({
  providers: [GoogleStorageProvider, FileStorageService],
  exports:[FileStorageService]
})
export class FileStorageModule {}
