import { Router } from 'express';
import {
  getUsers,
  createUser,
  getUserById,
  updateUserProfile,
} from '../controllers/users';

const router = Router();

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:userId', getUserById);
router.patch('/me', updateUserProfile);
router.patch('/me/avatar', updateUserProfile);

export default router;
