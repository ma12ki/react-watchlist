// import { redirect } from 'redux-first-router';
import restoreScroll from 'redux-first-router-restore-scroll';
import qs from 'qs';

const options = {
  // this can be used to guard routes that require special permissions
  // onBeforeChange: (dispatch, getState, { action, extra }) => {
    // const { user, location: { routesMap } } = getState()
    // const allowed = isAllowed(action.type, user, routesMap)
    // if (!allowed) {
    //   dispatch(redirect({ type: 'LOGIN' }))
    // }
  // },
  querySerializer: qs,
  restoreScroll: restoreScroll()
};

export default options;
