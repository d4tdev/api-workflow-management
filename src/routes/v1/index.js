import express from 'express';
const router = express.Router();

import { boardRouter } from './board.route';

router.get('/', (req, res) => {
   res.status(200).json({ status: 'OK' });
});

router.use('/boards', boardRouter);

export const apiV1 = router;
