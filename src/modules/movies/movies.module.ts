import { Module } from '@nestjs/common';
import { MoviesService } from './providers/movies.service';
import { MoviesController } from './movies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movies } from 'src/database/entities/movies.entity';
import { MovieType } from 'src/database/entities/movie-type.entity';
import { MovieTypeModule } from '../movie-type/movie-type.module';

@Module({
  providers: [MoviesService],
  controllers: [MoviesController],
  imports: [ MovieTypeModule, TypeOrmModule.forFeature([Movies])],
})
export class MoviesModule {}
