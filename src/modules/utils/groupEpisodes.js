import uniqSeasons from './uniqSeasons';

export default episodes => {
  const seasons = uniqSeasons(episodes);
  return seasons.map(season => episodes.filter(e => e.season === season).sort((a, b) => a.episode - b.episode));
};
