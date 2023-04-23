import { Router } from 'express';
import {
  getCards,
  createCard,
  getCardById,
  likeCard,
  dislikeCard,
} from '../controllers/cards';

const router = Router();

router.post('/', createCard);
router.get('/', getCards);
router.get('/:cardId', getCardById);
router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', dislikeCard);

export default router;
