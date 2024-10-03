import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './modules/movies/movies.module';
import { DatabaseModule } from './database/database.module';
import { ServerConfigModule } from './config/server-config.module';
import { UsersModule } from './modules/users/users.module';
import { Pagination } from './shared/utils/pagination.provider';
import { FileStorageModule } from './modules/file-storage/file-storage.module';

@Module({
  imports: [
    ServerConfigModule,
    DatabaseModule,
    MoviesModule,
    UsersModule,
    FileStorageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
