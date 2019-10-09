import Answer from '../database/models/answers';

/**
* @export
* @function createAnswer
* @param {String} body - question body
* @param {String} questionId - question id
* @param {Integer} userId - id of the user
* @returns {Object} object
*/
export const createAnswer = (body, questionId, userId) => {
  const answer = Answer({ body: body, questionId: questionId, userId: userId }).save()
  return answer;
};


/**
* @export
* @function fetchAnswer
* @param {Integer} answerId - answer id
* @returns {Object} object
*/
export const fetchAnswer = (answerId) => {
    const answer = Answer.findById(answerId, { __v: 0 }).populate('user', '-password -__v');
    return answer;
}