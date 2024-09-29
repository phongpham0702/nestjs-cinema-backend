import { ConflictException, Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import { ConfigService } from '@nestjs/config';
import { SaveData } from '@google-cloud/storage/build/cjs/src/file';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { ERROR_MESSAGE } from 'src/shared/constants/error-message.constant';
import { GOOGLE_STORAGE_BUCKET_URL } from 'src/shared/constants/file-upload.constant';
@Injectable()
export class GoogleStorageProvider {
  private googleStorage: Storage;

  constructor(private readonly configService: ConfigService) {
    this.googleStorage = new Storage({
      projectId: this.configService.get<string>('PROJECT_ID'),
      //keyFilename: 'src/modules/upload-file/providers/cinema-booking-backend-61eb5d820356.json',
      credentials: {
        private_key_id: this.configService.get<string>('PRIVATE_KEY_ID'),
        private_key: this.configService.get<string>('PRIVATE_KEY'),
        client_email: this.configService.get<string>('CLIENT_EMAIL'),
        client_id: this.configService.get<string>('CLIENT_ID'),
      },
    });
  }

  public async uploadFromMemory(
    uploadFile: Express.Multer.File,
    destination?: string,
  ) {
    let fileName = this.generateFileName(uploadFile.originalname);
    let path = destination ? `${destination}/${fileName}` : fileName;

    let file = this.googleStorage.bucket('cinema_images_bucket').file(path);

    try {
      await file.save(uploadFile.buffer, { contentType: uploadFile.mimetype });
    } catch (error) {
      throw new ConflictException(ERROR_MESSAGE.GENERAL.Unable_To_Process);
    }

    return {
      upload: true,
      fileURL: `${GOOGLE_STORAGE_BUCKET_URL}${path}`,
    };
  }

  public async uploadFile(fileName: string, fileData: SaveData) {
    let path = `movie_posters/${fileName}`;
    console.log(this.configService.get<string>('PRIVATE_KEY'));
    let testCreatefile = await this.googleStorage
      .bucket('cinema_images_bucket')
      .file(path)
      .save(fileData);
    //console.log(testCreatefile);
    return '';
  }

  private generateFileName(fileOriginalName: string) {
    let name = fileOriginalName.split('.')[0];

    //remove all white space
    name.replace(/\s/g, '').trim();

    let extension = path.extname(fileOriginalName);

    // generate time stamp
    let timestemp = new Date().getTime().toString().trim();

    return `${name}-${uuidv4()}-${timestemp}${extension}`;
  }
}
