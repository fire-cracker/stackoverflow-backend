import sgMail from '@sendgrid/mail';
import env from 'dotenv';

import subscribersMailTemplate from './templates/subscribersMail.template';

env.config();
sgMail.setApiKey(process.env.SENDGRID_KEY);

/**
  * @export
  * @function notificationMail
  * @param {Object} subscriberName - name of the subscriber
  * @param {Object} subscriberEmail - email of the subcriber
  * @param {Object} questionDetails - details of the question answered
  * @returns {null} null
  */
export const notificationMail = (subscriberName, subscriberEmail, subscriberId, questionTitle, questionId) => {
  const msg = {
    to: subscriberEmail,
    from: process.env.STACKOVERFLOW_EMAIL_ADDRESS,
    subject: 'StackOverFlow Notification Mail',
    html: subscribersMailTemplate(subscriberName, subscriberId, questionTitle, questionId),
  };
  return sgMail.send(msg);
};
