import { IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from 'src/shared/dtos/pagination-query.dto';

export class GetMovieTypesDto extends PaginationQueryDto {
  @IsString()
  @IsOptional()
  search?: string;

}
