import { Injectable } from '@nestjs/common';
import { ConfigService, registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

// export default registerAs("database", () => ({
//     host: process.env.DB_HOST,
//     port: parseInt(process.env.DB_POST),
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     databaseName: process.env.DB_NAME,
//     synchronize: process.env.DB_SYNC,
//     autoLoadEntities: process.env.DB_AUTOLOAD,
// }));

@Injectable()
export class PostgreDbConfiguration implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    return {
      logging: false,
      //entities:[Movies,MovieType],
      type: 'postgres',
      host: this.configService.get<string>('DB_HOST'),
      port: this.configService.get<number>('DB_PORT'),
      username: this.configService.get<string>('DB_USER'),
      password: this.configService.get<string>('DB_PASSWORD'),
      database: this.configService.get<string>('DB_NAME'),
      synchronize: this.configService.get<boolean>('DB_SYNC'),
      autoLoadEntities: this.configService.get<boolean>('DB_AUTOLOAD'),
    };
  }
} 
  