import { combineEpics } from 'redux-observable';

import { epics as dashboardEpics } from '../modules/dashboard';
import { epics as userShowActionsEpics } from '../modules/userShowActions';
import { epics as showsEpics } from '../modules/shows';
import { epics as showActionsEpics } from '../modules/showActions';

export default combineEpics(
  dashboardEpics,
  userShowActionsEpics,
  showsEpics,
  showActionsEpics,
);
