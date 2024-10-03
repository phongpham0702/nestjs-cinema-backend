import { Injectable, RequestTimeoutException } from '@nestjs/common';
import {
  FindOneOptions,
  ObjectLiteral,
  Repository,
} from 'typeorm';
import { PaginationQueryDto } from '../dtos/pagination-query.dto';
import { IPaginationResponse } from '../interfaces/pagination-response.interface';
import { ERROR_MESSAGE } from '../constants/common-message.constant';

@Injectable()
export class Pagination {
  constructor() {}

  public async paginationQuery<T extends ObjectLiteral>(
    paginationQuery: PaginationQueryDto,

    repository: Repository<T>,

    options?: FindOneOptions<T>,
  ) {
    let result: T[];
    let totalItems: number;
    try {
      result = await repository.find({
        ...options,
        skip: (paginationQuery.page - 1) * paginationQuery.limit,
        take: paginationQuery.limit,
      });

      totalItems = await repository.countBy(options?.where);
    } catch (error) {
      throw new RequestTimeoutException(
        `${Pagination.name}: ${ERROR_MESSAGE.GENERAL.Unable_To_Process}`,
      );
    }

    const totalPages: number = Math.ceil(totalItems / paginationQuery.limit);

    const finalResponse: IPaginationResponse<T> = {
      data: result,
      meta: {
        totalItems: totalItems,
        itemsPerPage: paginationQuery.limit,
        currentPage: paginationQuery.page,
        totalPage: totalPages,
      },
    };

    return finalResponse;
  }
}
