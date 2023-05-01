import { celebrate, Joi } from 'celebrate';
import { defaultUser } from '../constants';

export function urlValidator(str: string) {
  let res = '';

  if (/^https?:\/\/(www\.)?/i.test(str)) {
    res = str.replace(/^https?:\/\/(www\.)?/i, '');
  } else {
    return false;
  }
  // eslint-disable-next-line no-useless-escape
  return /^([0-9a-z]([-\?#\[\]@!\$&'\(\)\*\,;=\+_~:0-9a-z\.])*[0-9a-z]\.[a-z]{2,})(\/([-\?#\[\]@!\$&'\(\)\*\,;=\+_~:0-9a-z\.]))*/i.test(res);
}

export const cardIdValidator = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24).required(),
  }),
});

export const userDataValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).default(defaultUser.name),
    about: Joi.string().min(2).max(200).default(defaultUser.about),
    avatar: Joi.string().min(7).default(defaultUser.avatar),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }).unknown(true),
});