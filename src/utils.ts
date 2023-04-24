import { NextFunction, Request, Response } from 'express';
import { IUserRequest } from './types';

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
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    if (error instanceof Error && error.name === 'NotFound') {
      return res.status(404).send({ message: error.message });
    }
    return res.status(500).send({ message: 'Ошибка по умолчанию' });
  } catch (err) {
    return next();
  }
}
