import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import envValidation from './env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !process.env.NODE_ENV
        ? '.env'
        : `.env.${process.env.NODE_ENV}`,
      load: [],
      validationSchema: envValidation,
    }),
  ],
})
export class ServerConfigModule {}
