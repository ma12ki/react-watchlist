import * as express from 'express';
import * as bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import * as cors from 'cors';
import * as helmet from 'helmet';
import * as morgan from 'morgan';

import { config } from './config';
import { connect as dbConnect } from './db';
import { Schema } from './schema';
import { bearerToken, extractUser } from './helpers';

export const GRAPHQL_ROUTE = '/graphql';
export const GRAPHIQL_ROUTE = '/graphiql';
const { port, production, mongoUri } = config;

interface IMainOptions {
  production: boolean;
  port: number;
  mongoUri: string;
}

main({
  production,
  port,
  mongoUri,
}).then(() => {
  console.log('////////// All services started successfully. \\\\\\\\\\');
});

export function main(options: IMainOptions) {
  const app = express();

  app.use(helmet());
  app.use(morgan('combined'));

  app.use(GRAPHQL_ROUTE, cors());
  app.use(GRAPHQL_ROUTE, bearerToken);
  app.use(GRAPHQL_ROUTE, extractUser);
  app.use(GRAPHQL_ROUTE, bodyParser.json(), graphqlExpress((request) => {
    const { user } = request as any;
    return {
      context: {
        user,
      },
      schema: Schema,
    };
  }));

  if (!production) {
    app.use(GRAPHIQL_ROUTE, graphiqlExpress({ endpointURL: GRAPHQL_ROUTE }));
  }

  const serverStart = () => new Promise((resolve, reject) => {
    const server = app.listen(options.port, () => {
      verbosePrint(!production);

      resolve(server);
    }).on('error', (err: Error) => {
      reject(err);
    });
  });

  return Promise.all([serverStart() as any, dbConnect(options.mongoUri) as any]);
}

/* istanbul ignore next: no need to test verbose print */
function verbosePrint(enableGraphiql) {
  console.log(`GraphQL Server is now running on http://localhost:${port}${GRAPHQL_ROUTE}`);
  if (true === enableGraphiql) {
    console.log(`GraphiQL Server is now running on http://localhost:${port}${GRAPHIQL_ROUTE}`);
  }
}
