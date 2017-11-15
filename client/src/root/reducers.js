import * as blogModule from '../modules/blog';
import * as nestedModule from '../modules/nested';
import * as themesModule from '../modules/themes';
import * as screenModule from '../modules/screen';

export default {
  [blogModule.constants.moduleName]: blogModule.reducers,
  [nestedModule.constants.moduleName]: nestedModule.reducers,
  [themesModule.constants.moduleName]: themesModule.reducers,
  [screenModule.constants.moduleName]: screenModule.reducers,
};
