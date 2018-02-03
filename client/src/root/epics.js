import { combineEpics } from 'redux-observable';

import { epics as dashboardEpics } from '../modules/dashboard';
import { epics as episodeActionsEpics } from '../modules/episodeActions';
import { epics as showsEpics } from '../modules/shows';
import { epics as showEditEpics } from '../modules/showEdit';

export default combineEpics(
  dashboardEpics,
  episodeActionsEpics,
  showsEpics,
  showEditEpics,
);
