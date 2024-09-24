import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { MovieTypeService } from './providers/movie-type.service';
import { CreateMovieTypeDto } from './dtos/create-movie-type.dto';
import { GetMovieTypesDto } from './dtos/get-movie-types.dto';

@Controller('movie-type')
export class MovieTypeController {
  constructor(
    /**
     * Inject MovieType Service
     */
    private readonly movieTypeService: MovieTypeService,
  ) {}

  @Get()
  public getMovieTypes(@Query() getMovieTypesDto:GetMovieTypesDto) {
    
    return this.movieTypeService.getTypes(getMovieTypesDto);
  }

  @Post()
  public create(@Body() createMovieTypeDto: CreateMovieTypeDto) {
    return this.movieTypeService.create(createMovieTypeDto);
  }
}
