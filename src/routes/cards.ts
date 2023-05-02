import { Router } from 'express';
import {
  getCards,
  createCard,
  likeCard,
  dislikeCard,
  deleteCardById,
} from '../controllers/cards';
import { cardIdValidator, createCardValidator } from '../utils/validation';

const router = Router();

router.post('/', createCardValidator, createCard);
router.get('/', getCards);
router.delete('/:cardId', cardIdValidator, deleteCardById);
router.put('/:cardId/likes', cardIdValidator, likeCard);
router.delete('/:cardId/likes', cardIdValidator, dislikeCard);

export default router;
