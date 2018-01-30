import { moduleName as themesModuleName, reducers as themesReducers } from '../modules/themes';
import { moduleName as screenModuleName, reducers as screenReducers } from '../modules/screen';
import { moduleName as dashboardModuleName, reducers as dashboardReducers } from '../modules/dashboard';
import { moduleName as episodeActionsModuleName, reducers as episodeActionsReducers } from '../modules/episodeActions';

export default {
  [themesModuleName]: themesReducers,
  [screenModuleName]: screenReducers,
  [dashboardModuleName]: dashboardReducers,
  [episodeActionsModuleName]: episodeActionsReducers,
};
