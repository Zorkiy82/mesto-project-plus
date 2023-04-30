import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { IUserRequest } from '../types';

const auth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
      const error = new Error('Необходима авторизация');
      error.name = 'Unauthorized';
      throw error;
    }

    try {
      const token = authorization.replace('Bearer ', '');
      const payload = jwt.verify(token, 'some-secret-key');
      const reqCustom = req as IUserRequest;
      reqCustom.user = typeof payload !== 'string' ? payload : {};
    } catch (error) {
      return next({ error });
    }

    return next();
  } catch (error) {
    return next({ error });
  }
};

export default auth;
