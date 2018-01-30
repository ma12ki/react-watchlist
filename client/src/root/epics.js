import { combineEpics } from 'redux-observable';

import { epics as dashboardEpics } from '../modules/dashboard';
import { epics as episodeActionsEpics } from '../modules/episodeActions';

export default combineEpics(
  dashboardEpics,
  episodeActionsEpics,
);
