import {
  CreateMovieTypeTranslationDto,
  EditMovieTypeTranslationDto,
  GetMovieTypesDto,
} from '../dtos/movie-type.dto';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieType } from 'src/database/entities/movie-type.entity';
import { FindOptionsWhere, ILike, In, Repository } from 'typeorm';
import { CreateMovieTypeDto } from '../dtos/movie-type.dto';
import { Pagination } from 'src/shared/utils/pagination.provider';
import { ERROR_MESSAGE } from 'src/shared/constants/common-message.constant';
import { IPaginationResponse } from 'src/shared/interfaces/pagination-response.interface';
import { MovieTypeTranslation } from 'src/database/entities/movie-type-translation.entity';

@Injectable()
export class MovieTypeService {
  constructor(
    /**
     * Inject MovieType Repository
     */
    @InjectRepository(MovieType)
    private readonly movieTypeRepository: Repository<MovieType>,

    /**
     * Inject MoiveTypeTranslation Repository
     */
    @InjectRepository(MovieTypeTranslation)
    private readonly movieTypeTranslationRepository: Repository<MovieTypeTranslation>,

    /**
     * Inject Pagination Provider
     */
    private readonly paginationProvider: Pagination,
  ) {}

  //#region Movie types service

  public async getMovieTypeList(getMovieTypesDto: GetMovieTypesDto) {
    let conditions: FindOptionsWhere<MovieType> = {};

    if (getMovieTypesDto.search) {
      conditions.typeName = ILike(`%${getMovieTypesDto.search}%`);
    }

    const movieTypes: IPaginationResponse<MovieType> =
      await this.paginationProvider.paginationQuery<MovieType>(
        getMovieTypesDto,
        this.movieTypeRepository,
        {
          where: conditions,
          order: { typeName: 'ASC' },
          select: {
            id: true,
            typeName: true,
            createdDate: true,
            updatedDate: true,
          },
        },
      );

    return movieTypes;
  }

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

    if (findMovieType) {
      throw new BadRequestException('This movie type is already exists');
    }

    try {
      let newType: MovieType = await this.movieTypeRepository.create({
        ...createMovieTypeDto,
        typeName: createMovieTypeDto.typeName.toLowerCase().trim(),
      });
      return await this.movieTypeRepository.save(newType);
    } catch (error) {
      throw new ConflictException('Adding new movie type failed');
    }
  }

  public async delete(movieTypeID: number) {

    const findMovieType: MovieType = await this.movieTypeRepository.findOne({
      where: { id: movieTypeID },
    });

    if(!findMovieType) throw new BadRequestException(`Cannot find movie type ID ${movieTypeID}`)

    try {
      const removeResult = await this.movieTypeRepository.remove(findMovieType);
      return `Delete movie type ID:${movieTypeID} - Name:${removeResult.typeName} successfully`;
    } catch (error) {
      throw new ConflictException(`Delete movie type ID:${movieTypeID}failed`);
    }
  }

  //#endregion Movie types service

  //#region Movie type translations service

  public async getMovieTypesTranslations(movieTypeID: number) {
    let movieType: MovieType;
    try {
      movieType = await this.movieTypeRepository.findOne({
        where: {
          id: movieTypeID,
        },
        relations: {
          translation: true,
        },
        select: ['id', 'typeName', 'createdDate', 'updatedDate', 'translation'],
      });
    } catch (error) {}

    return movieType;
  }

  public async createTranslation(
    createMovieTypeTranslationDto: CreateMovieTypeTranslationDto,
  ) {
    console.log(createMovieTypeTranslationDto);
    const { languageCode, typeNameTranslation, movieTypeID } =
      createMovieTypeTranslationDto;

    const findMovieType = await this.movieTypeRepository.findOneBy({
      id: movieTypeID,
    });

    if (!findMovieType) {
      throw new BadRequestException(
        `Cannot find movie type with ID ${createMovieTypeTranslationDto.movieTypeID}`,
      );
    }

    const findTranslation = await this.movieTypeTranslationRepository.findOneBy(
      {
        languageCode: languageCode,
        movieType: {
          id: movieTypeID,
        },
      },
    );

    if (findTranslation) {
      throw new BadRequestException(
        `The movie type ID ${movieTypeID} already has a ${languageCode} code translation. Please delete or edit the old translation `,
      );
    }

    const newMovieTypeTranslation =
      await this.movieTypeTranslationRepository.create({
        typeNameTranslation: typeNameTranslation.trim().toLowerCase(),
        languageCode: languageCode,
        movieType: findMovieType,
      });

    return await this.movieTypeTranslationRepository.save(
      newMovieTypeTranslation,
    );
  }

  public async editTranslation(editTranslation: EditMovieTypeTranslationDto) {
    const { languageCode, movieTypeID, typeNameTranslation } = editTranslation;

    let findTranslation = await this.movieTypeTranslationRepository.findOneBy({
      languageCode: editTranslation.languageCode,
      movieType: {
        id: editTranslation.movieTypeID,
      },
    });

    if (!findTranslation) {
      throw new BadRequestException(
        `Cannot find ${languageCode} code translation of movie type ID ${movieTypeID}`,
      );
    }

    if (findTranslation.typeNameTranslation === typeNameTranslation) {
      throw new BadRequestException(
        `New translation name is same as old translation`,
      );
    }

    findTranslation.typeNameTranslation = typeNameTranslation;

    try {
      return await this.movieTypeTranslationRepository.save(findTranslation);
    } catch (error) {
      throw new ConflictException('Edit translation failed');
    }
  }

  public async deleteTranslation(translationID: number) {
    try {
      const deletedResult = await this.movieTypeTranslationRepository.delete({
        id: translationID,
      });

      return 'Delete translation successfully';
    } catch (error) {
      throw new ConflictException('Delete translation failed');
    }
  }

  //#endregion Movie type translations service

  public async findTypesById(
    typeIds: number[],
    options: {
      select?: Partial<Record<keyof MovieType, boolean>>;
      findAll?: boolean;
    },
  ) {
    const findAll = options?.findAll ?? false;

    let results: MovieType[];

    try {
      results = await this.movieTypeRepository.find({
        where: {
          id: In(typeIds),
        },
        select: options?.select,
      });
    } catch (error) {
      throw new RequestTimeoutException(
        ERROR_MESSAGE.GENERAL.Unable_To_Process,
      );
    }

    if (!results) {
      throw new BadRequestException(
        'Cannot find any movie type based on provided IDs',
      );
    }

    if (findAll && results.length !== typeIds.length) {
      const foundIds = results.map((type) => type.id);
      const missingIds = typeIds.filter((id) => !foundIds.includes(id));

      throw new BadRequestException(
        `Cannot find movie type with IDs ${missingIds.join(', ')}`,
      );
    }
    return results;
  }
}
