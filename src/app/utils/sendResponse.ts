import { Response } from 'express';

type TMeta = {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
};

type TResponse<T> = {
  statusCode: number;
  message: string;
  meta?: TMeta;
  data: T;
};

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data.statusCode).json({
    statusCode: data.statusCode,
    success: true,
    message: data.message,
    meta: data?.meta,
    data: data.data,
  });
};

export default sendResponse;
