import * as blogModule from '../modules/blog';
import * as nestedModule from '../modules/nested';
import * as themesModule from '../modules/themes';
import { moduleName as screenModuleName, reducers as screenReducers } from '../modules/screen';
import { moduleName as calendarModuleName, reducers as calendarReducers } from '../modules/dashboard';

export default {
  [blogModule.constants.moduleName]: blogModule.reducers,
  [nestedModule.constants.moduleName]: nestedModule.reducers,
  [themesModule.constants.moduleName]: themesModule.reducers,
  [screenModuleName]: screenReducers,
  [calendarModuleName]: calendarReducers,
};
