import { NextFunction, Request, Response } from 'express';
import { IErrorData } from '../types';
import {
  RES_STATUS_BAD_REQUEST,
  RES_STATUS_INTERNAL_SERVER_ERROR,
  RES_STATUS_NOT_FOUND,
  RES_STATUS_UNAUTORIZED,
} from '../constants';

export default async function handleError(
  { error, validationErrorMessage }: IErrorData,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    if (error.name === 'NotFound') {
      return res.status(RES_STATUS_NOT_FOUND).send({ message: error.message });
    }
    if (error.name === 'Unauthorized') {
      return res.status(RES_STATUS_UNAUTORIZED).send({ message: error.message });
    }

    if (error.name === 'JsonWebTokenError') {
      return res.status(RES_STATUS_UNAUTORIZED).send({ message: 'Необходима авторизация' });
    }

    if (error.name === 'ValidationError') {
      return res
        .status(RES_STATUS_BAD_REQUEST)
        .send({
          message: validationErrorMessage || error.message,
        });
    }
    if (error.name === 'CastError') {
      return res
        .status(RES_STATUS_BAD_REQUEST)
        .send({
          message: 'Передан невалидный _id',
        });
    }

    return res.status(RES_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Ошибка по умолчанию' });
  } catch (err) {
    return next();
  }
}
