import 'reflect-metadata';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as helmet from 'helmet';
import * as morgan from 'morgan';

import { port, production } from './config';
import { getConnection as getDbConnection } from './db';
import { bearerToken, extractUser, logger } from './helpers';

interface IMainOptions {
  production: boolean;
  port: number;
}

export async function main(options: IMainOptions) {
  const app = express();

  app.use(helmet());
  app.use(morgan('combined'));

  app.use(cors());
  // app.use(bearerToken);
  // app.use(extractUser);
  app.use(bodyParser.json());

  app.get('/ping', (req, res) => res.send('pong'));

  const serverStart = () => new Promise((resolve, reject) => {
    const server = app.listen(options.port, () => {
      logger.info(`server listening on port ${port}`);

      resolve(server);
    }).on('error', (err: Error) => {
      logger.error(err.message);

      reject(err);
    });
  });

  return Promise.all([serverStart() as any, getDbConnection() as any]);
}

main({
  production,
  port,
}).then(() => {
  logger.success('######### All services started successfully #########');
});
