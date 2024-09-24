import { Module } from '@nestjs/common';
import { MovieTypeService } from './providers/movie-type.service';
import { MovieTypeController } from './movie-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieType } from 'src/database/entities/movie-type.entity';
import { Pagination } from 'src/shared/utils/pagination.provider';

@Module({
    providers:[MovieTypeService, Pagination],
    exports:[MovieTypeService],
    controllers: [MovieTypeController],
    imports:[TypeOrmModule.forFeature([MovieType])]
})
export class MovieTypeModule {}
