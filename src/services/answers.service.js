import Answer from '../database/models/answers';
import { notificationMail } from '../helpers/mailer/mailer';

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

/**
* @export
* @function sendEmail
* @param {Object} subscribers - details of the subscriber and the question answered
* @returns {Object} object
*/
export const sendEmail = (subscribers) => subscribers.map(async(subscriber) => {
  const { user: {name, email, _id}, question: {title: questionTitle, _id: questionId }} = subscriber
  const subscriberName = name
  const subscriberEmail = email
  const subscriberId = _id
  return await notificationMail(subscriberName, subscriberEmail, subscriberId, questionTitle, questionId);
});