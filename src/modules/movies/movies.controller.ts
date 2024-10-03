import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateMovieDto } from './dtos/create-movie.dto';
import { MoviesService } from './providers/movies.service';
import { UpdateMovieDto } from './dtos/update-movie.dto';
import { ERROR_MESSAGE } from 'src/shared/constants/common-message.constant';

@Controller('movies')
export class MoviesController {
  constructor(
    /**
     * Inject Movie Service
     */
    private readonly movieService: MoviesService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('poster'))
  public createMovie(
    @Body() createMovieDto: CreateMovieDto,
    @UploadedFile() poster: Express.Multer.File,
  ) {
    if (!poster) {
      throw new BadRequestException(ERROR_MESSAGE.MOVIE.Missing_Poster);
    }

    return this.movieService.create(createMovieDto, poster);
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
