import { validationHandler } from './validationHandler';
import {
    createAnswerSchema
} from './schemas/answers.schema';


/**
* @export
* @function createAnswerValidator
* @param {Object} req - request received
* @param {Object} res - response object
* @param {Object} next - next object
* @returns {Object} next object
*/
export const createAnswerValidator = (req, res, next) => {
  return validationHandler(req.body, createAnswerSchema, res, next);
};