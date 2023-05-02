import { celebrate, Joi } from 'celebrate';
import { Router } from 'express';
import {
  getCards,
  createCard,
  likeCard,
  dislikeCard,
  deleteCardById,
} from '../controllers/cards';
import { cardIdValidator } from '../utils/validation';

const router = Router();

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().uri().required(),
  }).unknown(true),
}), createCard);
router.get('/', getCards);
router.delete('/:cardId', cardIdValidator, deleteCardById);
router.put('/:cardId/likes', cardIdValidator, likeCard);
router.delete('/:cardId/likes', cardIdValidator, dislikeCard);

export default router;
