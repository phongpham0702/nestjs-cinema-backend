import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  movieName: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  directors: string[];

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  actors: string[];

  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  duration: number;

  @IsDate()
  @IsNotEmpty()
  releaseDate: Date;

  @IsUrl()
  @MaxLength(1024)
  thumbnail: string;

  @IsArray()
  @IsInt({ each: true })
  @IsNotEmpty()
  types: number[];

  @IsString()
  @IsOptional()
  brief?: string;

  @IsUrl()
  @IsOptional()
  @MaxLength(1024)
  trailer?: string;
}
