import { z } from 'zod';

const createUserSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }).trim(),
    email: z.string({ required_error: 'Email is required' }).email(),
    password: z.string({ required_error: 'Password is required' }).trim(),
  }),
});

export const authValidation = {
  createUserSchema,
};
