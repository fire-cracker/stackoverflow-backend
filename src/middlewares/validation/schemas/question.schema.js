import Joi from '@hapi/joi';

const title = Joi.string().trim().min(8).max(200)
  .required();
const body = Joi.string().trim().min(20).max(2000)
.required();


export const createQuestionSchema = {
  title,
  body,
};
