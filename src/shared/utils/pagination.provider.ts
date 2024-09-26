import { Inject, Injectable, RequestTimeoutException } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import {
  FindOptionsOrder,
  FindOptionsSelect,
  FindOptionsWhere,
  ObjectLiteral,
  Repository,
} from 'typeorm';
import { PaginationQueryDto } from '../dtos/pagination-query.dto';
import { IPaginationResponse } from '../interfaces/pagination-response.interface';
import { ERROR_MESSAGE } from '../constants/error-message.constant';

@Injectable()
export class Pagination {
  constructor(
    /**
     * Inject Express Request
     */
    @Inject(REQUEST)
    private readonly request: Request,
  ) {}

  public async paginationQuery<T extends ObjectLiteral>(
    paginationQuery: PaginationQueryDto,

    repository: Repository<T>,
    options?: {
      queryCondition?: FindOptionsWhere<T>;
      order?: FindOptionsOrder<T>;
      select?: FindOptionsSelect<T>;
    },
  ) {
    let result: T[];
    let totalItems: number;
    try {
      result = await repository.find({
        where: options?.queryCondition,
        order: options?.order,
        skip: (paginationQuery.page - 1) * paginationQuery.limit,
        take: paginationQuery.limit,
        select: options?.select,
      });

      totalItems = await repository.countBy(options?.queryCondition);
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
