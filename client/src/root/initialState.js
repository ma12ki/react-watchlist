import { moduleName as themesModuleName, services as themesServices } from '../modules/themes';
import { moduleName as screenModuleName, services as screenServices } from '../modules/screen';
import { moduleName as userModuleName, retrieveUser } from '../modules/user';

export default {
  [themesModuleName]: {
    currentTheme: themesServices.retrieveTheme(),
  },
  [screenModuleName]: screenServices.getScreenMeta(),
  [userModuleName]: {
    user: retrieveUser(),
  }
};
