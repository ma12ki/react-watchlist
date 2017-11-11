/* eslint-disable react/display-name */
/* eslint-disable react/no-multi-comp */

import React from 'react';

import * as actionTypes from './actionTypes';
import { Home } from './components';

const routes = {
  [actionTypes.ROUTE_HOME]: {
    path: '/',
    component: () => <Home />,
  },
};

export default routes;
