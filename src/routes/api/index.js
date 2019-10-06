import { Router } from 'express';
import welcomeRoute from './welcomeRouter';


const routes = Router();

routes.use('/', welcomeRoute);


export default routes;
