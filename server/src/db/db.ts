import * as path from 'path';
import { createConnection, Connection } from 'typeorm';

import {
  dbHost,
  dbPort,
  dbName,
  dbUser,
  dbPass,
} from '../config';
import { logger } from '../helpers';
import { dbEntities as entities } from '../entities';

const connect: () => Promise<void> = async () => {
  try {
    await createConnection({
      type: 'mysql',
      host: dbHost,
      port: dbPort,
      username: dbUser,
      password: dbPass,
      database: dbName,
      entities,
      synchronize: true,
    });

    logger.info(`Connected to db at ${dbHost}:${dbPort}`);
  } catch (connectionError) {
    logger.error('Unable to connect to the db!', (connectionError as Error).message);
    logger.error((connectionError as Error).stack);
    throw connectionError;
  }
};

export default connect;
``