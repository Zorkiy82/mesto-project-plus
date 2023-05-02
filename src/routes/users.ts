import { Router } from 'express';
import {
  getUsers,
  getUserById,
  updateUserProfile,
  updateUserAvatar,
  getCurentUser,
} from '../controllers/users';
import { getUserByIdValidator, updateUserAvatarValidator, updateUserProfileValidator } from '../utils/validation';

const router = Router();

router.get('/', getUsers);

router.get('/me', getCurentUser);

router.get('/:userId', getUserByIdValidator, getUserById);

router.patch('/me', updateUserProfileValidator, updateUserProfile);

router.patch('/me/avatar', updateUserAvatarValidator, updateUserAvatar);

export default router;
