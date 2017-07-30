import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as errorHandler from 'errorhandler';
import * as logger from 'morgan';
import * as cors from 'cors';
import { Request, Response } from 'express';
import { InversifyExpressServer } from 'inversify-express-utils';

import { container } from './inversify.config';
import { port, production } from './config';

const server = new InversifyExpressServer(container);

server.setConfig((application) => {
  application.set('port', port);
  application.use(logger('dev'));
  application.use(cors());
  application.use(bodyParser.json());
  application.use(bodyParser.urlencoded({ extended: true }));
});

if (!production) {
  server.setErrorConfig((application) => {
    application.use(errorHandler());
  });
}

const app = server.build();

export { app };
