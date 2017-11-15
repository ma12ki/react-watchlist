import * as themesModule from '../modules/themes';
import * as screenModule from '../modules/screen';

export default {
  [themesModule.constants.moduleName]: {
    currentTheme: themesModule.service.restoreTheme(),
  },
  [screenModule.constants.moduleName]: screenModule.service.getScreenMeta(),
};
