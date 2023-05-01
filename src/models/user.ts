import mongoose, { Schema } from 'mongoose';
import isEmail from 'validator/lib/isEmail';
import { urlValidator } from '../utils/validation';
import { IUser } from '../types';
import { defaultUser } from '../constants';

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: defaultUser.name,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 200,
    default: defaultUser.about,
  },
  avatar: {
    type: String,
    validate: {
      validator: (v: string) => urlValidator(v),
      message: 'Не валидное значение url',
    },
    default: defaultUser.avatar,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v: string) => isEmail(v),
      message: 'Не валидное значение email',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

export default mongoose.model('user', userSchema);
