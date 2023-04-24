import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Card from '../models/card';
import { IUserRequest } from '../types';

export const getCards = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const card = await Card.find({});
    return res.status(200).send(card);
  } catch (error) {
    return next(error);
  }
};

export const createCard = async (req: IUserRequest, res: Response, next: NextFunction) => {
  try {
    const { name, link } = req.body;

    const card = await Card.create({ name, link, owner: req.user?._id });

    return res.status(201).send(card);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res
        .status(400)
        .send({
          message: 'Переданы некорректные данные при создании карточки',
        });
    }
    return next(error);
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

    return res.status(202).send({ message: 'Пост удалён' });
  } catch (error) {
    return next(error);
  }
};

export const likeCard = async (req: IUserRequest, res: Response, next: NextFunction) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user?._id } },
      { new: true },
    );
    if (!card) {
      const error = new Error('Передан несуществующий _id карточки');
      error.name = 'NotFound';
      throw error;
    }

    return res.status(200).send(card);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res
        .status(400)
        .send({
          message: 'Переданы некорректные данные для постановки/снятии лайка',
        });
    }
    return next(error);
  }
};

export const dislikeCard = async (req: IUserRequest, res: Response, next: NextFunction) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user?._id } },
      { new: true },
    );
    if (!card) {
      const error = new Error('Передан несуществующий _id карточки');
      error.name = 'NotFound';
      throw error;
    }

    return res.status(200).send(card);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res
        .status(400)
        .send({
          message: 'Переданы некорректные данные для постановки/снятии лайка',
        });
    }
    return next(error);
  }
};
