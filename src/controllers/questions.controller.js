import { addQuestion, fetchAllQuestions, questionCount } from '../services/questions.service';


/**
* @export
* @function createQuestion
* @param {Object} req - request received
* @param {Object} res - response object
* @returns {Object} JSON object (JSend format)
*/
export const createQuestion = async (req, res) => {
  try {
    const {
      body: {
        title, body
      }, 
      user: {
        _id: userId
      }
    } = req;

    const question = await addQuestion(title, body, userId);
    return res.status(200).send({
      data: {
        question
      }
    });
  } catch (error) {
    return res.status(502).send({
      message: 'An error occurred'
    });
  }
};

/**
* @export
* @function getAllQuestions
* @param {Object} req - request received
* @param {Object} res - response object
* @returns {Object} JSON object (JSend format)
*/
export const getAllQuestions = async ({ query: { limit = 10, page = 0 } }, res) => {
  try {
    const questions = await fetchAllQuestions(Number(limit), page);
    const numOfQuestions = await questionCount()
    return res.status(200).send({
      data: {
        questions,
        questions_count: numOfQuestions
      }
    });
  } catch (error) {
    return res.status(502).send({
      message: 'An error occurred'
    });
  }
};