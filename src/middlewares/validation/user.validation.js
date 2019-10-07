import { validationHandler } from './validationHandler';
import {
  createUserSchema
} from './schemas/user.schema';


/**
* @export
* @function registerCustomerValidator
* @param {Object} req - request received
* @param {Object} res - response object
* @param {Object} next - next object
* @returns {Object} next object
*/
export const createUserValidator = (req, res, next) => {
  return validationHandler(req.body, createUserSchema, res, next);
};
