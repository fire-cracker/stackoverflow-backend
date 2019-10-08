import Joi from '@hapi/joi';

const objectId = Joi.string().min(24).max(24).required();

export const paramsValidator = async(req, res, next) => {
  try {
    const [paramsKey] = Object.keys(req.params);
    await Joi.validate(req.params, { [paramsKey]: objectId });
    next();
  } catch (error) {
    return res.status(400).send({
        status: 'fail',
        data: {
        message: `${error.details[0].path[0]} must be a single string of 12 bytes or 24 hex characters`
      }
    });
  }
};
