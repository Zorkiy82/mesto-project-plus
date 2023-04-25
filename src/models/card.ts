import mongoose, { Date, Schema } from 'mongoose';
// eslint-disable-next-line no-unused-vars
import User from './user';
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
    ref: 'User',
    required: true,
  },
  likes: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('card', cardSchema);
