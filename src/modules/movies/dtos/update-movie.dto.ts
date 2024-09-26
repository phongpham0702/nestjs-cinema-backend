import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from './create-movie.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateMovieDto extends PartialType(CreateMovieDto) {
    
    @IsNumber()
    @IsNotEmpty()
    id:number;
}
