import { Router } from 'express';
import passport from 'passport';

import { postAnswer } from '../../controllers/answers.controller.js'
import { authInterceptor } from '../../middlewares/validation/validationHandler';
import { createAnswerValidator } from '../../middlewares/validation/answers.validation';
import { paramsValidator } from '../../middlewares/validation/params.validation';

const answersRouter = Router({ mergeParams: true });


answersRouter.post('/',
    passport.authenticate('jwt', { session: false }),
    authInterceptor,
    paramsValidator,
    createAnswerValidator,
    postAnswer);

export default answersRouter;
