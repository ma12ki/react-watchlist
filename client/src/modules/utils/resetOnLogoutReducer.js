const resetOnLogout = (reducer) => (state, action = {}) => {
  if (action.type === 'user/LOGOUT') {
    state = undefined;
  }

  return reducer(state, action);
};

export default resetOnLogout;
