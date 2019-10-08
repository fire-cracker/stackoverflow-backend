import { Router } from 'express';
import passport from 'passport';

import { createQuestion } from '../../controllers/questions.controller'
import { authInterceptor } from '../../middlewares/validation/validationHandler';
import { createQuestionValidator } from '../../middlewares/validation/question.validation';

const questionsRouter = Router();

questionsRouter.post('/',
    passport.authenticate('jwt', { session: false }),
    authInterceptor,
    createQuestionValidator,
    createQuestion);

export default questionsRouter;
