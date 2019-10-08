import { validationHandler } from './validationHandler';
import {
    createQuestionSchema
} from './schemas/question.schema';


/**
* @export
* @function createQuestionValidator
* @param {Object} req - request received
* @param {Object} res - response object
* @param {Object} next - next object
* @returns {Object} next object
*/
export const createQuestionValidator = (req, res, next) => {
  return validationHandler(req.body, createQuestionSchema, res, next);
};