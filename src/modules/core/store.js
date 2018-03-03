import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import { connectRoutes } from 'redux-first-router';
import { createEpicMiddleware } from 'redux-observable';

import routes from './routes';
import options from './routerOptions';
import { default as reducers, epics } from './duck';
import initialState from './initialState';

const configureStoreProd = () => {
  const {
    reducer,
    middleware,
    enhancer
  } = connectRoutes(routes, options);

  const rootReducer = combineReducers({ ...reducers, location: reducer });
  const epicMiddleware = createEpicMiddleware(epics);
  const middlewares = applyMiddleware(middleware, epicMiddleware, thunk);
  const enhancers = compose(enhancer, middlewares);

  return createStore(rootReducer, initialState, enhancers);
};

const configureStoreDev = () => {
  const {
    reducer,
    middleware,
    enhancer
  } = connectRoutes(routes, options);

  const rootReducer = combineReducers({ ...reducers, location: reducer });
  const epicMiddleware = createEpicMiddleware(epics);
  const middlewares = applyMiddleware(reduxImmutableStateInvariant(), middleware, epicMiddleware, thunk);
  const enhancers = composeEnhancers(enhancer, middlewares);

  const store = createStore(rootReducer, initialState, enhancers);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextReducer = require('./reducers').default; // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    });
  }

  return store;
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  : compose;

const configureStore = process.env.NODE_ENV === 'production' ? configureStoreProd : configureStoreDev;

export default configureStore();
