import * as path from 'path';
import { config as dotenvConfig } from 'dotenv';

import { logger } from '../helpers';

const env = dotenvConfig({
  path: path.resolve('./', '..', '.env'),
});

logger.info('Read .env file:');
console.log(env);

const production = process.env.NODE_ENV === 'production';
const dbHost = process.env.MYSQL_HOST;
const dbPort = Number(process.env.WL_DB_PORT);
const dbName = process.env.MYSQL_DATABASE;
const dbUser = process.env.MYSQL_USER;
const dbPass = process.env.MYSQL_PASSWORD;
const port = Number(process.env.WL_SERVER_PORT);
const jwtSecret = process.env.WL_JWT_SECRET;

export {
  production,
  dbHost,
  dbPort,
  dbName,
  dbUser,
  dbPass,
  port,
  jwtSecret,
};
