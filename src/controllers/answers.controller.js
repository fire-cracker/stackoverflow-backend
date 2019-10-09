import {
    createAnswer, fetchAnswer
} from '../services/answers.service';
import {
    fetchQuestion
} from '../services/questions.service';


/**
* @export
* @function postAnswer
* @param {Object} req - request received
* @param {Object} res - response object
* @returns {Object} JSON object (JSend format)
*/
export const postAnswer = async (req, res) => {
    try {
        const {
            body: {
                body
            },
            user: {
                _id: userId
            },
            params: { questionId }
        } = req;

        const question = await fetchQuestion(questionId)

        if (!question) {
            return res.status(404).send({
                status: 'fail',
                data: {
                    message: 'Question does not exist',
                }
            });
        }

        const createdAnswer = await createAnswer(body, questionId, userId);
        const answer = await fetchAnswer(createdAnswer._id);

        return res.status(200).send({
            status: 'success',
            data: {
                answer
            }
        });
    } catch (error) {
        return res.status(502).send({
            message: 'An error occurred'
        });
    }
};