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
import {
  Show,
  Season,
  Episode,
} from '../entities';

let connection: Connection;

const getConnection: () => Promise<Connection> = async () => {
  if (connection) {
    return connection;
  }

  try {
    connection = await createConnection({
      driver: {
        type: 'mysql',
        host: dbHost,
        port: dbPort,
        username: dbUser,
        password: dbPass,
        database: dbName,
      },
      entities: [
        Show,
        Season,
        Episode,
      ],
      autoSchemaSync: true,
    });

    logger.info(`Connected to db at ${dbHost}:${dbPort}`);
  } catch (connectionError) {
    logger.error('Unable to connect to the db!', (connectionError as Error).message);
    logger.error((connectionError as Error).stack);
    throw connectionError;
  }

  return connection;
};

export {
  getConnection,
};
