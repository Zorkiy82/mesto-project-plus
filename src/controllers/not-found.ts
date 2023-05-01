import { NextFunction, Request, Response } from 'express';
import NotFoundError from '../utils/not-found-error';

const notFoundController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    throw new NotFoundError('Статус 404 - страница не найдена');
  } catch (error) {
    const errorData = { error };
    return next(errorData);
  }
};

export default notFoundController;
