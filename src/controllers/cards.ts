import { NextFunction, Request, Response } from 'express';
import Card from '../models/card';
import { IUserRequest } from '../types';
import { RES_STATUS_CREATED, RES_STATUS_OK } from '../constants';

export const getCards = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const card = await Card.find({}).populate(['owner', 'likes']);
    return res.status(RES_STATUS_OK).send(card);
  } catch (error) {
    const errorData = { error };
    return next(errorData);
  }
};

export const createCard = async (req: IUserRequest, res: Response, next: NextFunction) => {
  try {
    const { name, link } = req.body;

    let card = await Card.create({ name, link, owner: req.user?._id });
    card = await card.populate(['owner', 'likes']);

    return res.status(RES_STATUS_CREATED).send(card);
  } catch (error) {
    const errorData = {
      error,
      validationErrorMessage: 'Переданы некорректные данные при создании карточки',
    };
    return next(errorData);
  }
};

export const deleteCardById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const card = await Card.findByIdAndDelete(req.params.cardId);
    if (!card) {
      const error = new Error('Карточка с указанным _id не найдена');
      error.name = 'NotFound';
      throw error;
    }

    return res.status(RES_STATUS_OK).send({ message: 'Пост удалён' });
  } catch (error) {
    const errorData = { error };
    return next(errorData);
  }
};

export const likeCard = async (req: IUserRequest, res: Response, next: NextFunction) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user?._id } },
      { new: true },
    ).populate(['owner', 'likes']);
    if (!card) {
      const error = new Error('Передан несуществующий _id карточки');
      error.name = 'NotFound';
      throw error;
    }

    return res.status(RES_STATUS_OK).send(card);
  } catch (error) {
    const errorData = { error };
    return next(errorData);
  }
};

export const dislikeCard = async (req: IUserRequest, res: Response, next: NextFunction) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user?._id } },
      { new: true },
    ).populate(['owner', 'likes']);
    if (!card) {
      const error = new Error('Передан несуществующий _id карточки');
      error.name = 'NotFound';
      throw error;
    }

    return res.status(RES_STATUS_OK).send(card);
  } catch (error) {
    const errorData = { error };
    return next(errorData);
  }
};
