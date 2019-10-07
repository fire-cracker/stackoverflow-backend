import Joi from '@hapi/joi';

/**
* @export
* @function validationHandler
* @param {Object} req - request received
* @param {Object} schema - response object
* @param {Object} res - response object
* @param {Object} next - next object
* @returns {Object} next object
*/
export const validationHandler = async (req, schema, res, next) => {
  try {
    await Joi.validate(req, schema);
    next();
  } catch (error) {
    return res.status(400).send({
        status: 'fail',
        data: {
        message: error.details[0].message,
        field: error.details[0].path[0]
      }
    });
  }
};
