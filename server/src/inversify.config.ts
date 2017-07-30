import { Container } from 'inversify';

import { dbModule } from './db';
import { modules } from './endpoints';

const container = new Container();
container.load(
  dbModule,
  ...modules,
);

export { container };
