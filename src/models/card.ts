import mongoose, { Date, Schema } from 'mongoose';
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
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    // TODO заменить ссылку
    ref: 'user',
    required: true,
  },
  likes: [{ type: Schema.Types.ObjectId, default: [] }],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('card', cardSchema);
