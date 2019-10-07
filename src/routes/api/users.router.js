import { Router } from 'express';

import { userSignup } from '../../controllers/users.controller'
import { createUserValidator } from '../../middlewares/validation/user.validation';

const usersRouter = Router();

usersRouter.post('/', createUserValidator, userSignup);

export default usersRouter;
