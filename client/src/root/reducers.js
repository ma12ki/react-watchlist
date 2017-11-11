import { constants as blogConstants, reducers as blogReducers } from '../modules/blog';
import { constants as nestedConstants, reducers as nestedReducers } from '../modules/nested';

export default {
  [blogConstants.moduleName]: blogReducers,
  [nestedConstants.moduleName]: nestedReducers,
};
