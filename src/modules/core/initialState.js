import { initialState as themesInitialState } from '../themes';
import { initialState as screenInitialState } from '../screen';
import { initialState as userInitialState } from '../user';

export default {
  ...themesInitialState,
  ...screenInitialState,
  ...userInitialState,
};
