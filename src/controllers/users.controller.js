import { signToken } from '../helpers/tokenization';
import { getUser, createUser, login } from '../services/users.service';


/**
* @export
* @function userSignup
* @param {Object} req - request received
* @param {Object} res - response object
* @returns {Object} JSON object (JSend format)
*/
export const userSignup = async (req, res) => {
  try {
    const {
      body: {
        name, email, password
      }
    } = req;

    const [userExist] = await getUser(email);

    if (userExist) {
      return res.status(409).send({
        status: 'fail',
        data: { message: 'User with this email already exist.' }
      });
    }

    const user = await createUser(name, email, password);
    const userToken = signToken({
      role: 'user',
      email
    });

    return res.status(200).send({
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        },
        accessToken: `Bearer ${userToken}`,
        expires_in: '24h'
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
* @function loginUser
* @param {Object} req - request received
* @param {Object} res - response object
* @returns {Object} JSON object (JSend format)
*/
export const userLogin = async (req, res) => {
  try {
    const { body: { email, password } } = req;
    const user = await login(email);

    if (!user) {
      return res.status(404).send({
        status: 'fail',
        data: { message: 'Email does not exist' }
      });
    }

    if (user.validatePassword(password) === false) {
      return res.status(404).send({
        status: 'fail',
        data: { message: 'Provide correct login credentials' }
      });
    }

    const userToken = signToken({
      role: 'user',
      email
    });

    return res.status(200).send({
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        },
        accessToken: `Bearer ${userToken}`,
        expires_in: '24h'
      }
    });

  } catch (error) {
    return res.status(502).send({
      message: 'An error occurred'
    });
  }
};