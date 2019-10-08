import Question from '../database/models/questions';


/**
* @export
* @function addQuestion
* @param {String} title - customer name
* @param {String} body - customer email
* @param {String} userId - customer password
* @returns {Object} object
*/
export const addQuestion = (title, body, userId) => {
  const question = Question({ title: title, body: body, userId: userId }).save()
  return question;
};
