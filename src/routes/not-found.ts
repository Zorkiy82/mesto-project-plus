import { Router } from 'express';
import notFoundController from '../controllers/not-found';

const router = Router();

router.use('/', notFoundController);

export default router;
