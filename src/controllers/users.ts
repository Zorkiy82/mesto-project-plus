import { Request, Response } from 'express';
import User from '../models/user';
import { IUserRequest } from '../types';

export const getUsers = (req: Request, res: Response) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

export const getUserById = (req: Request, res: Response) => {
  User.findById(req.params.userId)
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

export const createUser = (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

export const updateUserProfile = (req: IUserRequest, res: Response) => {
  const expectedKeys = ['name', 'about', 'avatar'];
  const newUserData = new Map();

  expectedKeys.forEach((key) => {
    const keyData = req.body[key];
    if (keyData) {
      newUserData.set(key, keyData);
    }
  });

  User.findByIdAndUpdate(req.user?._id, Object.fromEntries(newUserData), { new: true })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};
