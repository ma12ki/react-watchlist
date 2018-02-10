import { Container } from 'inversify';

import { modules } from './modules';

const container = new Container();
container.load(
  ...modules,
);

export { container };
