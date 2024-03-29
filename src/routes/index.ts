import { Router } from 'express';
import userRouter from './users';
import cardRouter from './cards';
import notFoundRouter from './not-found';

const router = Router();

router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.use('/', notFoundRouter);

export default router;
