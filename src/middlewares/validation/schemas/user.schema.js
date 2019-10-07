import Joi from '@hapi/joi';

const name = Joi.string().trim().min(8).max(150)
  .required();
const email = Joi.string().trim().min(8).max(100)
  .email({ minDomainSegments: 2 })
  .required();
const password = Joi.string().min(8).max(150).trim()
  .regex(/^[a-zA-Z0-9]{3,30}$/)
  .required();



export const createUserSchema = {
  name,
  email,
  password
};

