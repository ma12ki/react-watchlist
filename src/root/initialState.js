import { initialState as themesInitialState } from '../modules/themes';
import { initialState as screenInitialState } from '../modules/screen';
import { initialState as userInitialState } from '../modules/user';

export default {
  ...themesInitialState,
  ...screenInitialState,
  ...userInitialState,
};
