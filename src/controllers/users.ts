import { NextFunction, Request, Response } from 'express';
import { IUserRequest } from '../types';
import { RES_STATUS_OK, RES_STATUS_CREATED } from '../constants';
import User from '../models/user';

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await User.find({});
    return res.status(RES_STATUS_OK).send(user);
  } catch (error) {
    const errorData = { error };
    return next(errorData);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, about, avatar } = req.body;
    const user = await User.create({ name, about, avatar });
    return res.status(RES_STATUS_CREATED).send(user);
  } catch (error) {
    const errorData = {
      error,
      validationErrorMessage:
        'Переданы некорректные данные при создании пользователя',
    };
    return next(errorData);
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      const error = new Error('Пользователь по указанному _id не найден');
      error.name = 'NotFound';
      throw error;
    }

    return res.status(RES_STATUS_OK).send(user);
  } catch (error) {
    const errorData = { error };
    return next(errorData);
  }
};

const updateUser = async (
  req: IUserRequest,
  res: Response,
  next: NextFunction,
  expectedKeys = ['name', 'about', 'avatar'],
) => {
  try {
    const newUser = new Map();

    expectedKeys.forEach((key) => {
      const keyData = req.body[key];
      if (keyData) {
        newUser.set(key, keyData);
      }
    });
    const user = await User.findByIdAndUpdate(
      req.user?._id,
      Object.fromEntries(newUser),
      {
        new: true,
        runValidators: true,
      },
    );
    if (!user) {
      const error = new Error('Пользователь по указанному _id не найден');
      error.name = 'NotFound';
      throw error;
    }

    return res.status(RES_STATUS_OK).send(user);
  } catch (error) {
    const errorData = {
      error,
      validationErrorMessage:
        'Переданы некорректные данные при обновлении профиля',
    };

    return next(errorData);
  }
};

export const updateUserProfile = (
  req: IUserRequest,
  res: Response,
  next: NextFunction,
) => updateUser(req, res, next, ['name', 'about']);

export const updateUserAvatar = (
  req: IUserRequest,
  res: Response,
  next: NextFunction,
) => updateUser(req, res, next, ['avatar']);
