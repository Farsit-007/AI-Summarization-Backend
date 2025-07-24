import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validateBody = await schema.parseAsync({
        body: req.body,
        cookies: req.cookies,
        query: req.query,
      });

      req.body = validateBody.body;

      next();
    } catch (err) {
      next(err);
    }
  };
};

export default validateRequest;
