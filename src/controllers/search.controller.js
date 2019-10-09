import {
  getQuestionsBySearchParam, getQuestionsByanswerParam, getQuestionsByUserParam
  } from '../services/search.service';

/**
 * @export
 * @function searchQuestion
 * @param {Object} req - request received
 * @param {Object} res - response object
 * @returns {Object} JSON object (JSend format)
 */
export const searchQuestion = async (req, res) => {
    const { query: { question, answer, user, limit = 10, page = 0 } } = req;
    let foundQuestions;

    try {
        if (question) {
            foundQuestions = await getQuestionsBySearchParam(question, Number(limit), page);
        } else if (answer) {
            foundQuestions = await getQuestionsByanswerParam(answer, Number(limit), page);
        } else if (user) {
            foundQuestions = await getQuestionsByUserParam(user, Number(limit), page);
        }
        
        if (!foundQuestions.length) {
            return res.status(404).send({
                status: 'fail',
                data: { message: 'No Question was found' }
            });
        }

        return res.status(200).send({
            status: 'success',
            data: {
                result: foundQuestions
            }
        });
    } catch (error) {
        return res.status(502).send({
            status: 'error',
            message: 'Internal server error occurred'
        });
    }
};