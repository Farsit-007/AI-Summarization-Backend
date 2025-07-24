/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import config from '../config';
import AppError from '../errors/AppError';
import handleZodError from '../errors/handleZodError';
import handleDuplicateError from '../errors/handleDuplicateError';
import { TErrorSources } from '../types';

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = 'A server error occurred.';
  let errorSources: TErrorSources = [
    {
      path: '',
      message: 'A server error occurred.',
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err.message;
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err.message;
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ];
  }

  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message,
    stack:
      config.node_env === 'development'
        ? err?.stack
        : 'Optional stack trace shown only in development',
  });
};

export default globalErrorHandler;
