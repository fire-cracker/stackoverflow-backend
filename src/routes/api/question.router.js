import { Router } from 'express';
import passport from 'passport';

import {
    createQuestion, getAllQuestions, getQuestion,
     upVoteQuestion, downVoteQuestion, subscribeQuestion
} from '../../controllers/questions.controller'
import { authInterceptor } from '../../middlewares/validation/validationHandler';
import { createQuestionValidator } from '../../middlewares/validation/question.validation';
import { paramsValidator } from '../../middlewares/validation/params.validation';
import answersRouter from './answers.router';

const questionsRouter = Router();

questionsRouter.post('/',
    passport.authenticate('jwt', { session: false }),
    authInterceptor,
    createQuestionValidator,
    createQuestion);

questionsRouter.get('/',
    getAllQuestions);

questionsRouter.get('/:questionId',
    paramsValidator,
    getQuestion);

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

questionsRouter.post('/:questionId/subscribe',
    passport.authenticate('jwt', { session: false }),
    authInterceptor,
    paramsValidator,
    subscribeQuestion);

questionsRouter.use('/:questionId/answers', answersRouter)

export default questionsRouter;
