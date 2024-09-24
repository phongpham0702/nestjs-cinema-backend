import { GetMovieTypesDto } from './../dtos/get-movie-types.dto';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
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
    let findMovieType: MovieType | null =
      await this.movieTypeRepository.findOne({
        where: {
          typeName: createMovieTypeDto.typeName,
        },
      });

    if (findMovieType) {
      throw new BadRequestException('This movie type is already exists');
    }

    let newType: MovieType = await this.movieTypeRepository.create({
      ...createMovieTypeDto,
      typeName: createMovieTypeDto.typeName.toLowerCase().trim(),
    });

    try {
      return await this.movieTypeRepository.save(newType);
    } catch (error) {
      this.serviceLogger.error(error);
      throw new ConflictException('Adding new movie type failed');
    }
  }

  public async getTypes(getMovieTypesDto: GetMovieTypesDto) {
    let conditions: FindOptionsWhere<MovieType> = {};

    if (getMovieTypesDto.search) {
      conditions.typeName = ILike(`%${getMovieTypesDto.search}%`);
    }

    const movieTypes = await this.paginationProvider.paginationQuery<MovieType>(
      getMovieTypesDto,
      this.movieTypeRepository,
      {
        queryCondition: conditions,
        order: { typeName: 'ASC' },
      },
    );

    return movieTypes;
  }

  public async findMultipleTypesById(typeIds: number[]) {
    let results: MovieType[] = await this.movieTypeRepository.find({
      where: {
        id: In(typeIds),
      },
    });
    return results;
  }

  public async findTypesByName(typeNames: string | string[]) {}
}
