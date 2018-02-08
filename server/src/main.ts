import 'reflect-metadata';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as helmet from 'helmet';
import * as morgan from 'morgan';

import { port, production } from './config';
import connect from './db';
import { logger } from './helpers';
import { app } from './app';

interface IMainOptions {
  production: boolean;
  port: number;
}

main({
  production,
  port,
}).then(() => {
  logger.success('######### All services started successfully #########');
});

export async function main(options: IMainOptions) {
  const serverStart = () => new Promise((resolve, reject) => {
    const server = app.listen(options.port, () => {
      logger.info(`server listening on port ${port}`);

      resolve(server);
    }).on('error', (err: Error) => {
      logger.error(err.message);

      reject(err);
    });
  });

  return Promise.all([serverStart() as any, connect() as any]);
}
