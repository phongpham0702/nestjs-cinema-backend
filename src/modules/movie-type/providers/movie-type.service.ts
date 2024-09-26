import { GetMovieTypesDto } from './../dtos/get-movie-types.dto';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieType } from 'src/database/entities/movie-type.entity';
import {
  FindOptionsOrder,
  FindOptionsWhere,
  ILike,
  In,
  Repository,
} from 'typeorm';
import { CreateMovieTypeDto } from '../dtos/create-movie-type.dto';
import { Pagination } from 'src/shared/utils/pagination.provider';
import { ERROR_MESSAGE } from 'src/shared/constants/error-message.constant';
import { IPaginationResponse } from 'src/shared/interfaces/pagination-response.interface';

@Injectable()
export class MovieTypeService {
  /**
   * Logger Instance
   */
  private readonly serviceLogger = new Logger(MovieTypeService.name);

  constructor(
    /**
     * Inject MovieType Repository
     */
    @InjectRepository(MovieType)
    private readonly movieTypeRepository: Repository<MovieType>,

    /**
     * Inject Pagination Provider
     */
    private readonly paginationProvider: Pagination,
  ) {}

  public async create(
    createMovieTypeDto: CreateMovieTypeDto,
  ): Promise<MovieType> {
    let findMovieType: undefined | MovieType | null = undefined;

    try {
      findMovieType = await this.movieTypeRepository.findOne({
        where: {
          typeName: createMovieTypeDto.typeName.toLowerCase(),
        },
      });
    } catch (error) {
      throw new RequestTimeoutException(
        ERROR_MESSAGE.GENERAL.Unable_To_Process,
      );
    }
    console.log(findMovieType);
    if (findMovieType) {
      throw new BadRequestException(ERROR_MESSAGE.MOVIE_TYPE.Already_Exist);
    }

    try {
      let newType: MovieType = await this.movieTypeRepository.create({
        ...createMovieTypeDto,
        typeName: createMovieTypeDto.typeName.toLowerCase().trim(),
      });
      return await this.movieTypeRepository.save(newType);
    } catch (error) {
      throw new ConflictException(ERROR_MESSAGE.MOVIE_TYPE.Create_Fail);
    }
  }

  public async getTypes(getMovieTypesDto: GetMovieTypesDto) {
    let conditions: FindOptionsWhere<MovieType> = {};

    if (getMovieTypesDto.search) {
      conditions.typeName = ILike(`%${getMovieTypesDto.search}%`);
    }

    const movieTypes: IPaginationResponse<MovieType> =
      await this.paginationProvider.paginationQuery<MovieType>(
        getMovieTypesDto,
        this.movieTypeRepository,
        {
          queryCondition: conditions,
          order: { typeName: 'ASC' },
        },
      );

    return movieTypes;
  }

  public async findTypesById(typeIds: number[]) {
    try {
      let results: MovieType[] = await this.movieTypeRepository.find({
        where: {
          id: In(typeIds),
        },
      });
      return results;
    } catch (error) {
      throw new RequestTimeoutException(
        ERROR_MESSAGE.GENERAL.Unable_To_Process,
      );
    }
  }

  public async findTypesByName(typeNames: string | string[]) {}
}
