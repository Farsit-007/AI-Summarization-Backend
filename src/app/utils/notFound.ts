import { RequestHandler } from 'express';
import { httpStatus } from './httpStatus';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const notFound: RequestHandler = async (req, res, next) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Route is not found! Please try again!',
    error: {
      path: req.originalUrl,
      message: 'Your requested path is not found!',
    },
  });
};

export default notFound;
