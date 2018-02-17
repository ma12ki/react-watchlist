import { moduleName as themesModuleName, reducers as themesReducers } from '../modules/themes';
import { moduleName as screenModuleName, reducers as screenReducers } from '../modules/screen';
import { moduleName as dashboardModuleName, reducers as dashboardReducers } from '../modules/dashboard';
import { moduleName as showOperationsModuleName, reducers as showOperationsReducers } from '../modules/showOperations';
import { moduleName as showsModuleName, reducers as showsReducers } from '../modules/shows';
import { moduleName as usersModuleName, reducers as usersReducers } from '../modules/users';
import { moduleName as userModuleName, reducers as userReducers } from '../modules/user';

export default {
  [themesModuleName]: themesReducers,
  [screenModuleName]: screenReducers,
  [dashboardModuleName]: dashboardReducers,
  [showOperationsModuleName]: showOperationsReducers,
  [showsModuleName]: showsReducers,
  [usersModuleName]: usersReducers,
  [userModuleName]: userReducers,
};
