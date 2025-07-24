import jwt, { JwtPayload, Secret, SignOptions } from 'jsonwebtoken';
import AppError from '../errors/AppError';
import { httpStatus } from './httpStatus';

type TAuthUser = {
  name: string;
  email: string;
};

export const generateToken = (
  payload: TAuthUser,
  secret: string,
  expiresIn: string
): string => {
  const token = jwt.sign(payload, secret, {
    algorithm: 'HS256',
    expiresIn: expiresIn,
  } as SignOptions);

  return token;
};

export const verifyToken = (token: string, secret: Secret) => {
  let decoded;
  try {
    decoded = jwt.verify(token, secret) as JwtPayload;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized!');
  }

  return decoded;
};
