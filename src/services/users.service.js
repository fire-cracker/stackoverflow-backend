import User from '../database/models/users';


/**
* @export
* @function createUser
* @param {String} name - customer name
* @param {String} email - customer email
* @param {String} password - customer password
* @returns {Object} object
*/
export const createUser = (name, email, password) => {
  const user = User({ name: name, email: email, password: password }).save()
  return user;
};

/**
* @export
* @function getUser
* @param {String} email - customer email
* @returns {Object} object
*/
export const getUser = (email) => {
  const user = User.find({ email: email })
  return user;
};

/**
* @export
* @function login
* @param {String} email - customer email
* @returns {Object} object
*/
export const login = (email) => {
  const user = User.findOne({ email: email })
  return user;
};