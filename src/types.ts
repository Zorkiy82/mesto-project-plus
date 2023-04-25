import { Request } from 'express';
import { Schema } from 'mongoose';

export interface IUser {
  name: string;
  about: string;
  avatar: string;
}

export interface ICard {
  name: string;
  link: string;
  owner: Schema.Types.ObjectId;
  likes: Schema.Types.ObjectId[];
  createdAt: Date;
}

export interface IErrorData{
  error: any;
  validationErrorMessage?: string;
}

export interface IUserRequest extends Request {
  user?: { _id: string };
}
