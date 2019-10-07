import { Router } from 'express';

const welcomeRouter = Router();

welcomeRouter.get('/', (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'Welcome to my simple clone of Stackflow Backend Project. Read the READMe for a better understanding of how to implement the project',
  });
});

export default welcomeRouter;
