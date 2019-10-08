import chalk from 'chalk';
import express from 'express';
import { createLogger, format, transports } from 'winston';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';

import db from './database/models';
import auth from './middlewares/authentication/authenticate';
import router from './routes';

const logger = createLogger({
  level: 'debug',
  format: format.simple(),
  transports: [new transports.Console()]
});

dotenv.config();


const app = express();
const corsOptions = {
  credentials: true,
  origin: [],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

app.use(morgan('dev'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

db.on('connected', console.error.bind(console, 'Connection Open'))

app.use(auth.initialize());
app.use(router);

app.get('*', (req, res) => res.status(200).send({
  status: 'fail',
  message: 'Route not found',
}));

// configure port and listen for requests
const port = parseInt(process.env.NODE_ENV === 'test' ? 8378 : process.env.PORT, 10) || 80;

app.listen(port, () => {
  logger.debug(`Server running on  http://localhost:${chalk.blue(port)}`);
});

export default app;
