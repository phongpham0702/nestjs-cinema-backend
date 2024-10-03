import { Transform, Type } from 'class-transformer';
import {
  ArrayMinSize,
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
  @Transform(({ value }): string[] => (Array.isArray(value) ? value : [value]))
  directors: string[];

  //@IsArray()
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

  @IsArray()
  @IsInt({ each: true })
  @IsNotEmpty()
  @Transform(({ value }): number[] =>
    Array.isArray(value) ? value.map((v) => Number(v)) : [Number(value)],
  )
  types: number[];

  @IsString()
  @IsOptional()
  brief?: string;

  @IsUrl()
  @IsOptional()
  @MaxLength(1024)
  trailer?: string;
}
