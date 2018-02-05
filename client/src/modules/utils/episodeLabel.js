import { padStart } from 'lodash';

export default (season, episode) => `S${padStart(season, 2, '0')}E${padStart(episode, 2, '0')}`;
