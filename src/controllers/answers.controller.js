import dotenv from 'dotenv';

import {
    createAnswer, fetchAnswer, sendEmail
} from '../services/answers.service';
import {
    fetchQuestion, fetchSubscribers
} from '../services/questions.service';

dotenv.config();
const env = process.env.NODE_ENV || 'development';

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
        const questionSubscribers = await fetchSubscribers(answer.questionId);

        if (env === 'development' || env === 'production') { 
        await sendEmail(questionSubscribers)
        }

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