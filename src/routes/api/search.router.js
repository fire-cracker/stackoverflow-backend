import { Router } from 'express';

import { searchQuestion } from '../../controllers/search.controller'

const searchRouter = Router();

searchRouter.get('/', searchQuestion);

export default searchRouter;
