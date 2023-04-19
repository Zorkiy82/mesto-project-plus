import { Router } from 'express';
import { getUsers, createUser } from '../controllers/users';

const router = Router();

router.get('/users', getUsers);

// router.get('/users/:userId', getUsersById);
router.post('/users', createUser);

export default router;
