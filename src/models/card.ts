import mongoose, { Date, Schema } from 'mongoose';
import { urlValidator } from '../utils/validation';
// eslint-disable-next-line no-unused-vars
import user from './user';
import { ICard } from '../types';

const cardSchema = new Schema<ICard>({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  link: {
    type: String,
    validate: {
      validator: (v: string) => urlValidator(v),
      message: 'Не валидное значение link',
    },
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{ type: Schema.Types.ObjectId, ref: 'user', default: [] }],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('card', cardSchema);
