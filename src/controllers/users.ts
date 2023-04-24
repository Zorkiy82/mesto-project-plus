import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import User from '../models/user';
import { IUserRequest } from '../types';

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.find({});
    return res.status(200).send(user);
  } catch (error) {
    return next(error);
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, about, avatar } = req.body;
    const user = await User.create({ name, about, avatar });
    return res.status(201).send(user);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res
        .status(400)
        .send({
          message: 'Переданы некорректные данные при создании пользователя',
        });
    }
    return next(error);
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      const error = new Error('Пользователь по указанному _id не найден');
      error.name = 'NotFound';
      throw error;
    }

    return res.status(200).send(user);
  } catch (error) {
    return next(error);
  }
};

export const updateUserProfile = async (req: IUserRequest, res: Response, next: NextFunction) => {
  try {
    const expectedKeys = ['name', 'about', 'avatar'];
    const newUserData = new Map();

    expectedKeys.forEach((key) => {
      const keyData = req.body[key];
      if (keyData) {
        newUserData.set(key, keyData);
      }
    });
    const user = await User.findByIdAndUpdate(
      req.user?._id,
      Object.fromEntries(newUserData),
      { new: true },
    );
    if (!user) {
      const error = new Error('Пользователь по указанному _id не найден');
      error.name = 'NotFound';
      throw error;
    }

    return res.status(202).send(user);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res
        .status(400)
        .send({
          message: 'Переданы некорректные данные при обновлении профиля',
        });
    }
    return next(error);
  }
};
