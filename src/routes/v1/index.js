import express from 'express';
const router = express.Router();

import { boardRouter } from './board.route';
import { cardRouter } from './card.route';
import { columnRouter } from './column.route';
import { authRouter } from './auth.route';

router.use('/auth', authRouter);
router.use('/boards', boardRouter);
router.use('/columns', columnRouter);
router.use('/cards', cardRouter);
router.get('/', (req, res) => {
   res.status(200).json({ status: 'OK' });
});

export const apiV1 = router;
