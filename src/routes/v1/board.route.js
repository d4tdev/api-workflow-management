import express from 'express';
const router = express.Router();

import BoardController from '*/controllers/board.controller';
import { BoardValidation } from '../../validations/board.validation';
import { AuthMiddleware } from '../../middlewares/auth.middleware';

router
   .route('/')
   .post(
      AuthMiddleware.verifyToken,
      BoardValidation.createNew,
      BoardController.createNew
   );
router
   .route('/:id')
   .get(AuthMiddleware.verifyToken, BoardController.getABoard)
   .put(
      AuthMiddleware.verifyToken,
      BoardValidation.updateOne,
      BoardController.updateOne
   );

export const boardRouter = router;
