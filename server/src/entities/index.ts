import { Show } from './show';
import { Season } from './season';
import { Episode } from './episode';

export * from './show';
export * from './season';
export * from './episode';

const entities = [
  Show,
  Season,
  Episode,
];

export { entities };
