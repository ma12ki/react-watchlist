import { moduleName as themesModuleName, reducers as themesReducers } from '../modules/themes';
import { moduleName as screenModuleName, reducers as screenReducers } from '../modules/screen';
import { moduleName as dashboardModuleName, reducers as dashboardReducers } from '../modules/dashboard';
import { moduleName as showOperationsModuleName, reducers as showOperationsReducers } from '../modules/showOperations';
import { moduleName as showsModuleName, reducers as showsReducers } from '../modules/shows';

export default {
  [themesModuleName]: themesReducers,
  [screenModuleName]: screenReducers,
  [dashboardModuleName]: dashboardReducers,
  [showOperationsModuleName]: showOperationsReducers,
  [showsModuleName]: showsReducers,
};
