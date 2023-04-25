import { NextFunction, Request, Response } from 'express';

const notFoundController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const error = new Error('Статус 404 - страница не найдена');
    error.name = 'NotFound';
    throw error;
  } catch (error) {
    const errorData = { error };
    return next(errorData);
  }
};

export default notFoundController;
