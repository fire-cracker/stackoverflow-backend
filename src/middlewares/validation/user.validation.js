import { validationHandler } from './validationHandler';
import {
  createUserSchema, userLoginSchema
} from './schemas/user.schema';


/**
* @export
* @function createUserValidator
* @param {Object} req - request received
* @param {Object} res - response object
* @param {Object} next - next object
* @returns {Object} next object
*/
export const createUserValidator = (req, res, next) => {
  return validationHandler(req.body, createUserSchema, res, next);
};

/**
* @export
* @function userLoginValidator
* @param {Object} req - request received
* @param {Object} res - response object
* @param {Object} next - next object
* @returns {Object} next object
*/
export const userLoginValidator = (req, res, next) => {
  return validationHandler(req.body, userLoginSchema, res, next);
};