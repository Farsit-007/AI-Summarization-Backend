/* eslint-disable @typescript-eslint/no-unused-vars */
import config from '../../config';
import prisma from '../../config/prisma';
import AppError from '../../errors/AppError';
import { httpStatus } from '../../utils/httpStatus';
import bcrypt from 'bcrypt';
import { generateToken, verifyToken } from '../../utils/jwtHelper';
import { JwtPayload, Secret } from 'jsonwebtoken';
import { User } from '@prisma/client';

// createUserIntoDB
const createUserIntoDB = async (payload: User) => {
  const user = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (user) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'User Already exists with the email');
  }

  const hashPassword: string = await bcrypt.hash(
    payload.password,
    Number(config.bcrypt_salt_rounds)
  );

  const userData = {
    ...payload,
    password: hashPassword,
  };

  const result = await prisma.user.create({
    data: userData,
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
  });

  return result;
};

// loginUserIntoDB
const loginUserIntoDB = async (payload: {
  email: string;
  password: string;
}) => {
  const userData = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (!userData) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid Credentials');
  }

  const isPassswordCorrect: boolean = await bcrypt.compare(
    payload.password,
    userData.password
  );

  if (!isPassswordCorrect) {
    throw new AppError(httpStatus.FORBIDDEN, 'Invalid Credentials');
  }

  const token = generateToken(
    {
      email: userData.email,

      name: userData.name,
    },
    config.jwt.jwt_secret as string,
    config.jwt.jwt_expiration as string
  );

  const refreshToken = generateToken(
    {
      email: userData.email,
      name: userData.name,
    },
    config.jwt.refresh_secret as string,
    config.jwt.jwt_refresh_expiration as string
  );

  return {
    token,
    refreshToken,
  };
};

// getMyProfile
const getMyProfile = async (user: JwtPayload) => {
  const userData = await prisma.user.findFirstOrThrow({
    where: {
      email: user?.email,
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  return userData;
};

// getNewtoken
const getNewtoken = async (token2: string) => {
  let decodedData;
  try {
    decodedData = verifyToken(token2, config.jwt.refresh_secret as Secret);
  } catch (error) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
  }

  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: decodedData.email,
    },
  });

  const token = generateToken(
    {
      email: userData.email,
      name: userData.name,
    },
    config.jwt.jwt_secret as string,
    config.jwt.jwt_expiration as string
  );

  return {
    token,
  };
};

export const authServices = {
  createUserIntoDB,
  loginUserIntoDB,
  getMyProfile,
  getNewtoken
};
