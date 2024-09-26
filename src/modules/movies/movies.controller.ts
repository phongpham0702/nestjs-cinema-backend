import {
  Body,
  Controller,
  Delete,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateMovieDto } from './dtos/create-movie.dto';
import { MoviesService } from './providers/movies.service';
import { UpdateMovieDto } from './dtos/update-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(
    /**
     * Inject Movie Service
     */
    private readonly movieService: MoviesService,
  ) {}

  @Post()
  public create(@Body() createMovieDto: CreateMovieDto) {
    return this.movieService.create(createMovieDto);
  }

  @Patch()
  public update(@Body() updateMovieDto: UpdateMovieDto) {
    return this.movieService.update(updateMovieDto);
  }

  @Delete()
  public delete(@Body('id', ParseIntPipe) deletedId: number) {
    return this.movieService.delete(deletedId);
  }
}
