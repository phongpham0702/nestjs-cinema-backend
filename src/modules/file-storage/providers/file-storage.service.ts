import { GOOGLE_STORAGE_POSTER_FOLDER_NAME } from '../../../shared/constants/file-upload.constant';
import { BadRequestException, Injectable } from '@nestjs/common';
import { GoogleStorageProvider } from './google-storage.provider';
import {
  MOVIE_POSTER_MAX_SIZE_BYTES,
  MOVIE_POSTER_MAX_SIZE_MB,
  SUPPORTED_MIME_TYPES,
} from 'src/shared/constants/file-upload.constant';

@Injectable()
export class FileStorageService {
  constructor(
    /**
     * Inject Google Storage provider
     */
    private readonly googleStorageProvider: GoogleStorageProvider,
  ) {}

  public async uploadPoster(poster: Express.Multer.File) {
    if (poster.size > MOVIE_POSTER_MAX_SIZE_BYTES) {
      throw new BadRequestException(
        `File is too large, only accept file under ${MOVIE_POSTER_MAX_SIZE_MB}MB`,
      );
    }

    if (!SUPPORTED_MIME_TYPES.includes(poster.mimetype)) {
      throw new BadRequestException('This file type is not supported');
    }

    return await this.googleStorageProvider.uploadFromMemory(
      poster,
      GOOGLE_STORAGE_POSTER_FOLDER_NAME,
    );
  }
}
