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
    cardId: Joi.string().hex().length(24).required(),
  }),
});

export const signinValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }).unknown(true),
});

export const signupValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).default(defaultUser.name),
    about: Joi.string().min(2).max(200).default(defaultUser.about),
    avatar: Joi.string().uri().default(defaultUser.avatar),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }).unknown(true),
});

export const createCardValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().uri().required(),
  }).unknown(true),
});

export const getUserByIdValidator = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24).required(),
  }),
});

export const updateUserProfileValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(200).required(),
  }),
});

export const updateUserAvatarValidator = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().uri().required(),
  }),
});
