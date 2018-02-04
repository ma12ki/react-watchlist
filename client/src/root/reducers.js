import { moduleName as themesModuleName, reducers as themesReducers } from '../modules/themes';
import { moduleName as screenModuleName, reducers as screenReducers } from '../modules/screen';
import { moduleName as dashboardModuleName, reducers as dashboardReducers } from '../modules/dashboard';
import { moduleName as userShowActionsModuleName, reducers as userShowActionsReducers } from '../modules/userShowActions';
import { moduleName as showsModuleName, reducers as showsReducers } from '../modules/shows';
import { moduleName as showActionsModuleName, reducers as showActionsReducers } from '../modules/showActions';

export default {
  [themesModuleName]: themesReducers,
  [screenModuleName]: screenReducers,
  [dashboardModuleName]: dashboardReducers,
  [userShowActionsModuleName]: userShowActionsReducers,
  [showsModuleName]: showsReducers,
  [showActionsModuleName]: showActionsReducers,
};
