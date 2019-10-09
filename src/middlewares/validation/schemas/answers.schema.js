import Joi from '@hapi/joi';

const body = Joi.string().trim().min(20).max(2000)
.required();


export const createAnswerSchema = {
  body
};
