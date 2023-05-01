import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { IUserRequest } from '../types';
import UnauthorizedError from '../utils/unauthorized-error';

const auth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new UnauthorizedError('Необходима авторизация');
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
