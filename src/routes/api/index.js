import { Router } from 'express';

import welcomeRoute from './welcome.router';
import usersRouter from './users.router';
import questionsRouter from './question.router';
import searchRouter from './search.router';

const routes = Router();

routes.use('/', welcomeRoute);
routes.use('/users', usersRouter)
routes.use('/questions', questionsRouter)
routes.use('/search', searchRouter)


export default routes;
