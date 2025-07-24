import { globalPaginationOptions } from '../constants/global.constants';
import pick from '../utils/pick';

export type TPaginationOptions = {
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
};

export type TPaginationReturn = {
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
};

export const CalculatePagination = (
  query: Record<string, unknown>
): TPaginationReturn => {
  const options: TPaginationOptions = pick(query, globalPaginationOptions);

  const page: number = Number(options?.page) || 1;
  const limit: number = Number(options?.limit) || 10;

  const skip: number = (page - 1) * limit;

  const sortBy: string = options?.sortBy || 'createdAt';
  const sortOrder: 'asc' | 'desc' = options?.sortOrder || 'desc';

  return { page, limit, skip, sortBy, sortOrder };
};
