import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgreDbConfiguration } from 'src/config/database.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: PostgreDbConfiguration,
    }),
  ],
})
export class DatabaseModule {}
