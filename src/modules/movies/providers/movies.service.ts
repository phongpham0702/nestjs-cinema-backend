import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { CreateMovieDto } from '../dtos/create-movie.dto';
import { FindOptionsSelect, Repository } from 'typeorm';
import { Movies } from 'src/database/entities/movies.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieTypeService } from './movie-type.service';
import { MovieType } from 'src/database/entities/movie-type.entity';
import { ERROR_MESSAGE } from 'src/shared/constants/common-message.constant';
import * as SlugGenerator from 'slug';
import { UpdateMovieDto } from '../dtos/update-movie.dto';
import { FileStorageService } from 'src/modules/file-storage/providers/file-storage.service';

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

    /**
     * Inject FileStorage Service
     */
    private readonly fileStorageService: FileStorageService,
  ) {}

  public async create(
    createMovieDto: CreateMovieDto,
    poster: Express.Multer.File,
  ) {
    const findMovie:Movies = await this.findbyName(createMovieDto.movieName, {
      id: true,
    });

    if (findMovie)
      throw new BadRequestException(ERROR_MESSAGE.MOVIE.Already_Exist_Movie);

    let { directors: directorsList, actors: actorsList } = createMovieDto;

    let types:MovieType[] = await this.movieTypeService.findTypesById(
      createMovieDto.types,
      {
        select: {
          id: true,
          typeName: true,
        },
        findAll: true,
      },
    );
  
    const { fileURL: posterURL } =
      await this.fileStorageService.uploadPoster(poster);

    try {
      const newMovie: Movies = this.movieRepository.create({
        ...createMovieDto,
        slug: SlugGenerator(createMovieDto.movieName),
        directors: directorsList.join(', '),
        actors: actorsList.join(', '),
        types: types,
        thumbnail: posterURL,
      });

      return await this.movieRepository.save(newMovie);
    } catch (error) {
      throw new ConflictException(ERROR_MESSAGE.MOVIE.Create_Fail);
    }
  }

  public async findbyName(
    movieName: string,
    select?: Partial<Record<keyof Movies, boolean>>,
  ) {
    const findMovie: Movies = await this.movieRepository.findOne({
      where: {
        movieName: movieName,
      },
      select: select,
    });

    return findMovie;
  }

  public async delete(id: number) {
    let findMovie: Movies;

    try {
      findMovie = await this.movieRepository.findOneBy({ id });
    } catch (error) {
      throw new NotFoundException(ERROR_MESSAGE.MOVIE.Find_Fail);
    }

    if (!findMovie)
      throw new BadRequestException(ERROR_MESSAGE.MOVIE.Movie_Not_Exist);

    try {
      const deletedMovie: Movies = await this.movieRepository.remove(findMovie);
      return { deleted: true, deletedMovie };
    } catch (error) {
      throw new RequestTimeoutException(ERROR_MESSAGE.MOVIE.Delete_Fail);
    }
  }

  public async update(updateMovieDto: UpdateMovieDto) {
    let { id: movieId, ...updateData } = updateMovieDto;
    let findMovie: Movies;

    try {
      findMovie = await this.movieRepository.findOneBy({
        id: movieId,
      });
    } catch (error) {
      throw new NotFoundException(ERROR_MESSAGE.MOVIE.Movie_Not_Exist);
    }

    if (!findMovie) {
      throw new NotFoundException(ERROR_MESSAGE.MOVIE.Find_Fail);
    }

    if (Object.keys(updateData).length === 0) {
      throw new BadRequestException(
        `${ERROR_MESSAGE.GENERAL.No_Data_Provided} for update`,
      );
    }

    const { actors, directors, movieName } = updateData;
    /**
     * Data need to be converted
     */
    if (actors) {
      findMovie.actors = actors.join(', ');
    }
    if (directors) {
      findMovie.directors = directors.join(', ');
    }
    if (movieName) {
      findMovie.movieName = movieName;
      findMovie.slug = SlugGenerator(movieName);
    }

    /**
     * Others data
     */
    Object.assign(findMovie, updateData);
    try {
      await this.movieRepository.save(findMovie);
    } catch (error) {
      throw new RequestTimeoutException(
        ERROR_MESSAGE.GENERAL.Unable_To_Process,
      );
    }

    return findMovie;
  }
}
