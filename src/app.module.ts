import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './modules/movies/movies.module';
import { DatabaseModule } from './database/database.module';
import { ServerConfigModule } from './config/server-config.module';
import { UsersModule } from './modules/users/users.module';
import { MovieTypeModule } from './modules/movie-type/movie-type.module';
import { Pagination } from './shared/utils/pagination.provider';
import { UploadFileModule } from './modules/upload-file/upload-file.module';



@Module({
  imports: [
    ServerConfigModule,
    DatabaseModule,
    MoviesModule,
    UsersModule,
    MovieTypeModule,
    UploadFileModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    Pagination,
  ],
})
export class AppModule {}
