import { Inject, Injectable } from '@nestjs/common';
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
    
    let result: T[] = await repository.find({
      where: options?.queryCondition,
      order: options?.order,
      skip: (paginationQuery.page - 1) * paginationQuery.limit,
      take: paginationQuery.limit,
      select: options?.select
    });
    
    const totalItems: number = await repository.countBy(options?.queryCondition);
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
