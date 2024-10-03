import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { MovieTypeService } from './providers/movie-type.service';
import {
  GetMovieTypesDto,
  CreateMovieTypeDto,
  CreateMovieTypeTranslationDto,
  EditMovieTypeTranslationDto,
} from './dtos/movie-type.dto';

@Controller('movie-types')
export class MovieTypesController {
  constructor(
    /**
     * Inject Movie Type Service
     */
    private readonly movieTypeService: MovieTypeService,
  ) {}

  //#region Movie types controller

  @Get()
  public getMovieTypeList(@Query() getMovieTypesDto: GetMovieTypesDto) {
    return this.movieTypeService.getMovieTypeList(getMovieTypesDto);
  }

  @Post()
  public createMovieType(@Body() createMovieTypeDto: CreateMovieTypeDto) {
    return this.movieTypeService.create(createMovieTypeDto);
  }

  @Delete('/:id')
  public deleteMovieType(@Param('id', ParseIntPipe) movieTypeID: number) {
    return this.movieTypeService.delete(movieTypeID);
  }

  //#endregion Movie types controller

  //#region Movie type translations controller

  @Get('get-translation/:id')
  public getTranslations(@Param('id', ParseIntPipe) movieTypeID: number) {
    return this.movieTypeService.getMovieTypesTranslations(movieTypeID);
  }

  @Post('create-translation')
  public createTranslation(
    @Body() createMovieTypeTranslationDto: CreateMovieTypeTranslationDto,
  ) {
    return this.movieTypeService.createTranslation(
      createMovieTypeTranslationDto,
    );
  }

  @Patch('edit-translation')
  public editTranslation(
    @Body() editTranslationDto: EditMovieTypeTranslationDto,
  ) {
    return this.movieTypeService.editTranslation(editTranslationDto);
  }

  @Delete('delete-translation/:id')
  public deleteTranslation(@Param('id', ParseIntPipe) translationID: number) {
    return this.movieTypeService.deleteTranslation(translationID);
  }

  //#endregion Movie type translations controller
}
