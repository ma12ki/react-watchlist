import { uniq } from 'lodash';

export default episodes => {
  const seasons = uniq(episodes.map(e => e.season)).sort((a, b) => a - b);
  return seasons.map(season => episodes.filter(e => e.season === season).sort((a, b) => a.episode - b.episode));
};
