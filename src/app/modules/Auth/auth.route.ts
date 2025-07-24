import { authControllers } from './auth.controller';
import { auth } from '../../middlewares/auth';
import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { authValidation } from './auth.validation';

const router = Router();

// createUser
router.post(
  '/register',
  validateRequest(authValidation.createUserSchema),
  authControllers.createUser
);

// loginUser
router.post('/login', authControllers.loginUser);

// getMyProfile
router.get('/me', auth(), authControllers.getMyProfile);

// gettoken
router.post('/access-token', authControllers.getNewtoken);


export const AuthRoutes = router;
