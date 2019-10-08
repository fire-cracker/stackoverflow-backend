import Question from '../database/models/questions';


/**
* @export
* @function addQuestion
* @param {String} title - question title
* @param {String} body - question body
* @param {String} userId - id of the user
* @returns {Object} object
*/
export const addQuestion = (title, body, userId) => {
  const question = Question({ title: title, body: body, userId: userId }).save()
  return question;
};

/**
* @export
* @function fetchAllQuestions
* @param {String} limit - number of questions perpage
* @param {String} page - page number
* @returns {Object} object
*/
export const fetchAllQuestions = (limit, page) => {
  const questions = Question.find({}).populate('userId').skip((limit * page))
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