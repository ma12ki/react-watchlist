import { uniq } from 'lodash';

export default episodes => uniq(episodes.map(e => e.season)).sort((a, b) => a - b);
