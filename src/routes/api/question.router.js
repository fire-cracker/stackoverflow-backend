import { Router } from 'express';
import passport from 'passport';

import { createQuestion, getAllQuestions, upVoteQuestion, downVoteQuestion } from '../../controllers/questions.controller'
import { authInterceptor } from '../../middlewares/validation/validationHandler';
import { createQuestionValidator } from '../../middlewares/validation/question.validation';
import { paramsValidator } from '../../middlewares/validation/params.validation';

const questionsRouter = Router();

questionsRouter.post('/',
    passport.authenticate('jwt', { session: false }),
    authInterceptor,
    createQuestionValidator,
    createQuestion);

questionsRouter.get('/',
    getAllQuestions);

questionsRouter.post('/:questionId/upvote',
    passport.authenticate('jwt', { session: false }),
    authInterceptor,
    paramsValidator,
    upVoteQuestion);

questionsRouter.post('/:questionId/downvote',
    passport.authenticate('jwt', { session: false }),
    authInterceptor,
    paramsValidator,
    downVoteQuestion);

export default questionsRouter;
