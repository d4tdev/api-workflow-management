import express from 'express';
const router = express.Router();

import CardController from '*/controllers/card.controller';
import { CardValidation } from '*/validations/card.validation';

router.route('/').post(CardValidation.createNew, CardController.createNew);
router.route('/:id').put(CardValidation.updateOne, CardController.updateOne);

export const cardRouter = router;
