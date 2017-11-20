import { combineEpics } from 'redux-observable';

import availableEpisodes from './availableEpisodes';

export default combineEpics(
  availableEpisodes,
);
