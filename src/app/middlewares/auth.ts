import { NextFunction, Request, Response } from 'express';
import AppError from '../errors/AppError';
import { httpStatus } from '../utils/httpStatus';
import { verifyToken } from '../utils/jwtHelper';
import config from '../config';
import { Secret } from 'jsonwebtoken';
import catchAsync from '../utils/catchAsync';
import prisma from '../config/prisma';
import { isTokenIssuedBeforePasswordChange } from '../helpers/authHelpers';

export const auth = () => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }

    const decoded = verifyToken(token, config.jwt.jwt_secret as Secret);

    const { email, iat } = decoded;

    // checking if the user is exist
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    // checking if any hacker using a token even-after the user changed the password
    if (
      user.passwordChangedAt &&
      (await isTokenIssuedBeforePasswordChange(
        user.passwordChangedAt,
        iat as number
      ))
    ) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    req.user = { ...decoded, id: user.id };
    next();
  });
};
