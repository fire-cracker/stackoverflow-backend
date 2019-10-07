import { Router } from 'express';

import { userSignup, userLogin } from '../../controllers/users.controller'
import { createUserValidator, userLoginValidator } from '../../middlewares/validation/user.validation';

const usersRouter = Router();

usersRouter.post('/', createUserValidator, userSignup);
usersRouter.post('/login', userLoginValidator, userLogin);

export default usersRouter;
