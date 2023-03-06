import express from 'express';
const router = express.Router();

import ColumnController from '*/controllers/column.controller';
import { ColumnValidation } from '../../validations/column.validation';

router.route('/').post(ColumnValidation.createNew, ColumnController.createNew);
router
   .route('/:id')
   .put(ColumnValidation.updateOne, ColumnController.updateOne);

export const columnRouter = router;
