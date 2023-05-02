import { NextFunction, Request, Response } from 'express';
import { IErrorData } from '../types';
import {
  RES_STATUS_BAD_REQUEST,
  RES_STATUS_CONFLICT,
  RES_STATUS_INTERNAL_SERVER_ERROR,
  RES_STATUS_NOT_FOUND,
  RES_STATUS_UNAUTORIZED,
} from '../constants';

export default function errorHandler(
  { error, validationErrorMessage }: IErrorData,
  req: Request,
  res: Response,
  // eslint-disable-next-line no-unused-vars
  next: NextFunction,
) {
  if (error.name === 'NotFound') {
    return res.status(RES_STATUS_NOT_FOUND).send({ message: error.message });
  }
  if (error.name === 'Unauthorized') {
    return res.status(RES_STATUS_UNAUTORIZED).send({ message: error.message });
  }

  if (error.name === 'JsonWebTokenError') {
    return res
      .status(RES_STATUS_UNAUTORIZED)
      .send({ message: 'Необходима авторизация' });
  }

  if (error.name === 'ValidationError') {
    return res.status(RES_STATUS_BAD_REQUEST).send({
      message: validationErrorMessage || error.message,
    });
  }
  if (error.name === 'CastError') {
    return res.status(RES_STATUS_BAD_REQUEST).send({
      message: 'Передан невалидный _id',
    });
  }

  if (error.code === 11000 && error.message.includes('email')) {
    return res
      .status(RES_STATUS_CONFLICT)
      .send({
        message: `Пользователь c email: ${error.keyValue.email} уже зарегистрирован`,
      });
  }

  return res
    .status(RES_STATUS_INTERNAL_SERVER_ERROR)
    .send({ message: 'Ошибка по умолчанию' });
}
