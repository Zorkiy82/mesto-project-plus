import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { IUserRequest } from '../types';
import { RES_STATUS_OK, RES_STATUS_CREATED } from '../constants';
import User from '../models/user';
import NotFoundError from '../utils/not-found-error';
import UnauthorizedError from '../utils/unauthorized-error';

// eslint-disable-next-line no-shadow, no-unused-vars
enum GetUserAction {
  // eslint-disable-next-line no-unused-vars
  All = 'All',
  // eslint-disable-next-line no-unused-vars
  ById = 'ByID',
  // eslint-disable-next-line no-unused-vars
  Current = 'Current',
}

const handleGetUsers = async (
  req: IUserRequest,
  res: Response,
  next: NextFunction,
  action = GetUserAction.Current,
) => {
  try {
    let searchResult = null;
    if (action === GetUserAction.All) searchResult = await User.find({});
    if (action === GetUserAction.ById) searchResult = await User.findById(req.params.userId);
    if (action === GetUserAction.Current) searchResult = await User.findById(req.user?._id);

    if (!searchResult) {
      throw new NotFoundError('Пользователь по указанному _id не найден');
    }

    return res.status(RES_STATUS_OK).send(searchResult);
  } catch (error) {
    return next({ error });
  }
};

export const getUsers = (
  req: IUserRequest,
  res: Response,
  next: NextFunction,
) => handleGetUsers(req, res, next, GetUserAction.All);

export const getUserById = (
  req: IUserRequest,
  res: Response,
  next: NextFunction,
) => handleGetUsers(req, res, next, GetUserAction.ById);

export const getCurentUser = (
  req: IUserRequest,
  res: Response,
  next: NextFunction,
) => handleGetUsers(req, res, next, GetUserAction.Current);

// -------------------------------------------------------------

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      name,
      about,
      avatar,
      email,
      password,
    } = req.body;

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    });

    return res.status(RES_STATUS_CREATED).send({
      _id: user._id,
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email,
    });
  } catch (error) {
    const errorData = {
      error,
      validationErrorMessage:
        'Переданы некорректные данные при создании пользователя',
    };
    return next(errorData);
  }
};

// -------------------------------------------------------------

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
      throw new NotFoundError('Пользователь по указанному _id не найден');
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

// -------------------------------------------------------------

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new UnauthorizedError('Неправильные почта или пароль');
    }
    const isMatches = await bcrypt.compare(password, user.password);
    let token = '';
    if (!isMatches) {
      throw new UnauthorizedError('Неправильные почта или пароль');
    }

    if (user) {
      token = jwt.sign(
        { _id: user._id },
        'some-secret-key',
        { expiresIn: '7d' },
      );
    }

    return res.status(RES_STATUS_OK).send({ token });
  } catch (error) {
    const errorData = { error };
    return next(errorData);
  }
};
