import * as themesModule from '../modules/themes';
import { moduleName as screenModuleName, services as screenServices } from '../modules/screen';

export default {
  [themesModule.constants.moduleName]: {
    currentTheme: themesModule.service.restoreTheme(),
  },
  [screenModuleName]: screenServices.getScreenMeta(),
};
