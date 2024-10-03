import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';
import { createTranslationDto } from 'src/shared/dtos/create-translation.dto';

import { PaginationQueryDto } from 'src/shared/dtos/pagination-query.dto';
export class CreateMovieTypeDto {
  @IsString()
  @IsNotEmpty()
  typeName: string;
}

export class GetMovieTypesDto extends PaginationQueryDto {
  @IsString()
  @IsOptional()
  search?: string;
}

export class CreateMovieTypeTranslationDto extends createTranslationDto {
  @IsNumber()
  movieTypeID: number;

  @IsString()
  @IsNotEmpty()
  typeNameTranslation: string;
}

export class EditMovieTypeTranslationDto extends createTranslationDto {
  @IsNumber()
  movieTypeID: number;

  @IsString()
  @IsNotEmpty()
  typeNameTranslation: string;
}
