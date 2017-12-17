/* eslint-disable react/display-name */
/* eslint-disable react/no-multi-comp */

import React from 'react';

import * as actionTypes from './actionTypes';
import { DashboardPage } from './components';

const routes = {
  [actionTypes.ROUTE_HOME]: {
    path: '/',
    component: () => <DashboardPage />,
  },
};

export default routes;
