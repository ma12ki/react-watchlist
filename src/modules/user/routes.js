/* eslint-disable react/display-name */
/* eslint-disable react/no-multi-comp */

import React from 'react';

import { ROUTE_LOGIN } from './duck';
import { LoginPage } from './components';

const routes = {
  [ROUTE_LOGIN]: {
    path: '/login',
    component: () => <LoginPage />,
    freeAccess: true,
  },
};

export default routes;
