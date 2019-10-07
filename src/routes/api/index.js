import { Router } from 'express';
import welcomeRoute from './welcome.router';
import usersRouter from './users.router';


const routes = Router();

routes.use('/', welcomeRoute);
routes.use('/users', usersRouter)


export default routes;
