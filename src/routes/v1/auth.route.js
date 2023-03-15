import express from 'express';
const router = express.Router();

import AuthController from '../../controllers/auth.controller';
import { AuthValidation } from '../../validations/auth.validation';
import { AuthMiddleware } from '../../middlewares/auth.middleware';

router
   .route('/register')
   .post(AuthValidation.register, AuthController.register);
router.route('/login').post(AuthValidation.login, AuthController.login);
router.route('/').get(AuthMiddleware.verifyToken, AuthController.getUserInfo);

export const authRouter = router;
