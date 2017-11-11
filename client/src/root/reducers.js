import { constants as blogConstants, reducers as blogReducers } from '../modules/blog';
import { constants as nestedConstants, reducers as nestedReducers } from '../modules/nested';
import * as themesModule from '../modules/themes';

export default {
  [blogConstants.moduleName]: blogReducers,
  [nestedConstants.moduleName]: nestedReducers,
  [themesModule.constants.moduleName]: themesModule.reducers,
};
