import jwt from 'jsonwebtoken';
import env from 'dotenv';

env.config();
const secret = process.env.JWT_SECRET;

/**
 * @export
 * @function signToken
 * @param {Object} payload - user object
 * @param {string} exp - exp default 24hours
 * @returns {string} Jwt token
 */
export const signToken = (payload, exp = '24h') => jwt.sign(payload, secret, { expiresIn: exp });

/**
 * @export
 * @function verifyToken
 * @param {Object} token - JWT token
 * @returns {string} Payload
 */
export const verifyToken = token => jwt.verify(token, secret);
