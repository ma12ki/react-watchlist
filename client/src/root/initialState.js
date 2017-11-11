import * as themesModule from '../modules/themes';

export default {
  [themesModule.constants.moduleName]: {
    currentTheme: themesModule.service.restoreTheme(),
  }
};
