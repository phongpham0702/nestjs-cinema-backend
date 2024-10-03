import { Module } from '@nestjs/common';
import { MoviesService } from './providers/movies.service';
import { MoviesController } from './movies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movies } from 'src/database/entities/movies.entity';
import { MovieType } from 'src/database/entities/movie-type.entity';
import { FileStorageModule } from '../file-storage/file-storage.module';
import { Pagination } from 'src/shared/utils/pagination.provider';
import { MovieTypeService } from './providers/movie-type.service';
import { MovieTypeTranslation } from 'src/database/entities/movie-type-translation.entity';
import { MovieTypesController } from './movie-types.controller';

@Module({
  providers: [MoviesService, MovieTypeService, Pagination],
  controllers: [MoviesController, MovieTypesController],
  imports: [
    FileStorageModule,
    TypeOrmModule.forFeature([Movies, MovieType, MovieTypeTranslation]),
  ],
})
export class MoviesModule {}
