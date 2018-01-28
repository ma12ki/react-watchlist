/* eslint-disable react/display-name */
/* eslint-disable react/no-multi-comp */

import React from 'react';

import { ROUTE_DASHBOARD } from './duck';
import { DashboardPage } from './components';

const routes = {
  [ROUTE_DASHBOARD]: {
    path: '/',
    component: () => <DashboardPage />,
  },
};

export default routes;
