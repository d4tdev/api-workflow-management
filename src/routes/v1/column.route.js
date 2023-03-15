import express from 'express';
const router = express.Router();

import ColumnController from '*/controllers/column.controller';
import { ColumnValidation } from '../../validations/column.validation';
import { AuthMiddleware } from '../../middlewares/auth.middleware';

router
   .route('/')
   .post(
      AuthMiddleware.verifyToken,
      ColumnValidation.createNew,
      ColumnController.createNew
   );
router
   .route('/:id')
   .put(
      AuthMiddleware.verifyToken,
      ColumnValidation.updateOne,
      ColumnController.updateOne
   );

export const columnRouter = router;
