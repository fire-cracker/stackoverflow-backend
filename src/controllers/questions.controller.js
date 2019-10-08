import {
  addQuestion, fetchAllQuestions, questionCount, fetchQuestion,
  fetchVote, upVote, votesCount, downVote
} from '../services/questions.service';


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

/**
* @export
* @function getQuestion
* @param {Object} req - request received
* @param {Object} res - response object
* @returns {Object} JSON object (JSend format)
*/
export const getQuestion = async ({ params: { questionId } }, res) => {
  try {
    const question = await fetchQuestion(questionId);

    if (!question) {
      return res.status(404).send({
        status: 'fail',
        data: {
          message: 'Question does not exist',
        }
      });
    }

    const numOfVotes = await votesCount(question._id)
    return res.status(200).send({
      status: 'success',
      data: {
        question,
        votes_count: numOfVotes
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
* @function upVoteQuestion
* @param {Object} req - request received
* @param {Object} res - response object
* @returns {Object} JSON object (JSend format)
*/
export const upVoteQuestion = async (req, res) => {
  try {
    const {
      params: {
        questionId
      },
      user: {
        _id: userId
      }
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

    if (String(question.userId) === String(userId)) {
      return res.status(401).send({
        status: 'fail',
        data: {
          message: 'You cannot vote your question',
        }
      });
    }

    const vote = await fetchVote(questionId, userId)

    if (!vote) {
      await upVote(questionId, userId);
    }

    if (vote && vote.upVote) {
      return res.status(400).send({
        status: 'fail',
        data: {
          message: 'You already upvoted this question',
        }
      });
    }

    if (vote && !vote.upVote) {
      await vote.updateOne({ upVote: true, downVote: false })
    }

    const numOfVotes = await votesCount(questionId)

    return res.status(200).send({
      status: 'success',
      data: {
        message: 'You upvoted this question',
        votes_count: numOfVotes
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
* @function downVoteQuestion
* @param {Object} req - request received
* @param {Object} res - response object
* @returns {Object} JSON object (JSend format)
*/
export const downVoteQuestion = async (req, res) => {
  try {
    const {
      params: {
        questionId
      },
      user: {
        _id: userId
      }
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

    if (String(question.userId) === String(userId)) {
      return res.status(401).send({
        status: 'fail',
        data: {
          message: 'You cannot vote your question',
        }
      });
    }
    const vote = await fetchVote(questionId, userId)

    if (!vote) {
      await downVote(questionId, userId);
    }

    if (vote && vote.downVote) {
      return res.status(400).send({
        status: 'fail',
        data: {
          message: 'You already downvoted this question',
        }
      });
    }

    if (vote && !vote.downVote) {
      await vote.updateOne({ upVote: false, downVote: true })
    }

    const numOfVotes = await votesCount(questionId)

    return res.status(200).send({
      status: 'success',
      data: {
        message: 'You downvoted this question',
        votes_count: numOfVotes
      }
    });
  } catch (error) {
    return res.status(502).send({
      message: 'An error occurred'
    });
  }
};