/* eslint-disable no-underscore-dangle */
import express from 'express';
import path from 'path';
// import helmet from "helmet";
// import cors from "cors";
import compression from 'compression';
import morgan from 'morgan';
// import logger from './logger';

import * as url from 'url';
// const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
global.__basedir = __dirname;

const { NODE_ENV = 'development' } = process.env;

export default function middlewareSetup(app) {
  // In dev mode, react-server serves the files
  // BUT in production we BUILD the react project and express serves it out of the build folder
  if (NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/', 'dist')));
    app.use(compression());
  }

  // parse application/x-www-form-urlencoded
  app.use(express.urlencoded({ extended: false }));

  // parse application/json
  app.use(express.json());

  // Helmet for security
  // app.use(helmet());
  // CORS to make our API public
  //   app.use(cors());

  // http logging
  app.use(morgan('dev'));

  //   let logger = new (winston.Logger)({
  //     exitOnError: false,
  //     level: 'info',
  //     transports: [
  //         new (winston.transports.Console)(),
  //         new (winston.transports.File)({ filename: 'app.log'})
  //     ]
  // })

  // using the logger and its configured transports, to save the logs created by Morgan
  // const myStream = {
  //     write: (text) => {
  //         logger.info(text)
  //     }
  // }

  // app.use(morgan('combined', { stream: myStream }));
}
