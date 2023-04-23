import { NextFunction, Request, Response } from 'express';
import { IUserRequest } from './types';

export default function fakeAuthorization(req: Request, res: Response, next: NextFunction) {
  const reqCustom = req as IUserRequest;
  reqCustom.user = {
    _id: '6441770cd37595a0afc8c46a',
  };

  next();
}
