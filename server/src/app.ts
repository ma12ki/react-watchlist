import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as errorHandler from 'errorhandler';
import * as morganLogger from 'morgan';
import * as cors from 'cors';
import { Request, Response } from 'express';
import { InversifyExpressServer, getRouteInfo } from 'inversify-express-utils';
import * as prettyjson from 'prettyjson';

import { logger, errorMapperMiddleware } from './helpers';
import { container } from './inversify.config';
import { port, production } from './config';
import AuthProvider from './modules/auth/AuthProvider';

const server = new InversifyExpressServer(container, null, { rootPath: '/api/v1' }, null, AuthProvider);

server.setConfig((application) => {
  application.set('port', port);
  if (!production) application.use(morganLogger('dev'));
  application.use(cors());
  application.use(bodyParser.json());
  application.use(bodyParser.urlencoded({ extended: true }));
});

server.setErrorConfig((application) => {
  application.use(errorMapperMiddleware);
  application.use(errorHandler());
});

const app = server.build();
const routeInfo = getRouteInfo(container);
logger.info('Route Map')
console.log(prettyjson.render({ routes: routeInfo }));

export { app };
