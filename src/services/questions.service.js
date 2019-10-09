import Question from '../database/models/questions';
import Vote from '../database/models/votes';

/**
* @export
* @function addQuestion
* @param {String} title - question title
* @param {String} body - question body
* @param {Integer} userId - id of the user
* @returns {Object} object
*/
export const addQuestion = (title, body, userId) => {
  const question = Question({ title: title, body: body, userId: userId }).save()
  return question;
};

/**
* @export
* @function fetchAllQuestions
* @param {Integer} limit - number of questions perpage
* @param {Integer} page - page number
* @returns {Object} object
*/
export const fetchAllQuestions = (limit, page) => {
  const questions = Question.find({}, { __v: 0 }).populate('user', '-password -__v').skip((limit * page))
  .limit(limit).sort( '-updatedAt' );
  return questions;
}

/**
* @export
* @function questionCount
* @returns {Object} object
*/
export const questionCount = () => {
  const numOfQuestions = Question.count();
  return numOfQuestions;
}


/**
* @export
* @function fetchQuestion
* @param {Integer} questionId - question id
* @returns {Object} object
*/
export const fetchQuestion = (questionId) => {
  const question = Question.findById(questionId, { __v: 0 }).populate('user', '-password -__v');
  return question;
}


/**
* @export
* @function fetchVote
* @param {Integer} questionId - question id
* @param {Integer} userId - id of the user
* @returns {Object} object
*/
export const fetchVote = (questionId, userId) => {
  const vote = Vote.findOne({ questionId: questionId, userId: userId }).exec();
  return vote;
}

/**
* @export
* @function upVote
* @param {Integer} questionId - question id
* @param {Integer} userId - id of the user
* @returns {Object} object
*/
export const upVote = (questionId, userId) => {
  const vote = Vote({ questionId: questionId, userId: userId, upVote: true }).save()
  return vote;
};

/**
* @export
* @function downVote
* @param {Integer} questionId - question id
* @param {Integer} userId - id of the user
* @returns {Object} object
*/
export const downVote = (questionId, userId) => {
  const vote = Vote({ questionId: questionId, userId: userId, downVote: true }).save()
  return vote;
};

/**
* @export
* @function votesCount
* @param {Integer} questionId - question id
* @returns {Object} object
*/
export const votesCount = async (questionId) => {
  const upVoteCount = await Vote.countDocuments({ questionId:  questionId, upVote: true });
  const downVoteCount = await Vote.countDocuments({ questionId:  questionId, downVote: true });
  return (upVoteCount - downVoteCount);
}