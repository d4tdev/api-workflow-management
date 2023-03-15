import express from 'express';
const router = express.Router();

import CardController from '*/controllers/card.controller';
import { CardValidation } from '*/validations/card.validation';
import { AuthMiddleware } from '../../middlewares/auth.middleware';

router
   .route('/')
   .post(
      AuthMiddleware.verifyToken,
      CardValidation.createNew,
      CardController.createNew
   );
router
   .route('/:id')
   .put(
      AuthMiddleware.verifyToken,
      CardValidation.updateOne,
      CardController.updateOne
   );

export const cardRouter = router;
