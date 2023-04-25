import { NextFunction, Request, Response } from 'express';
import { IErrorData, IUserRequest } from './types';
import { RES_STATUS_BAD_REQUEST, RES_STATUS_INTERNAL_SERVER_ERROR, RES_STATUS_NOT_FOUND } from './constants';

export function fakeAuthorization(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const reqCustom = req as IUserRequest;
  reqCustom.user = {
    _id: '6446b928069e26d802db63b3',
  };

  next();
}

export async function handleError(
  { error, validationErrorMessage }: IErrorData,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    if (error.name === 'NotFound') {
      return res.status(RES_STATUS_NOT_FOUND).send({ message: error.message });
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
