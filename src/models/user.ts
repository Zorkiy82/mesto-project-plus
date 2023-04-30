import mongoose, { Schema } from 'mongoose';
import isEmail from 'validator/lib/isEmail';
import { IUser } from '../types';

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 200,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
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
