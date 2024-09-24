import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from '../dtos/create-movie.dto';
import { Repository } from 'typeorm';
import { Movies } from 'src/database/entities/movies.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieTypeService } from '../../movie-type/providers/movie-type.service';

@Injectable()
export class MoviesService {
  constructor(
    /**
     * Inject Movie Repository
     */
    @InjectRepository(Movies)
    private readonly movieRepository: Repository<Movies>,

    /**
     * Inject MovieType Service
     */
    private readonly movieTypeService: MovieTypeService,
  ) {}

  public async create(createMovieDto: CreateMovieDto) {
    let { directors: directorsList, actors: actorsList } = createMovieDto;
    let types = await this.movieTypeService.findMultipleTypesById(
      createMovieDto.types,
    );
    console.log(types);
    let newMovie = this.movieRepository.create({
      ...createMovieDto,
      directors: directorsList.join(', '),
      actors: actorsList.join(', '),
      types: types,
    });
    console.log(newMovie);
    return await this.movieRepository.save(newMovie);
  }
}
