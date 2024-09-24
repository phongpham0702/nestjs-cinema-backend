import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateMovieDto } from './dtos/create-movie.dto';
import { MoviesService } from './providers/movies.service';

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
    console.log(createMovieDto);
    return this.movieService.create(createMovieDto);
  }
}
