import { Container } from 'inversify';

import { modules } from './endpoints';

const container = new Container();
container.load(
  ...modules,
);

export { container };
