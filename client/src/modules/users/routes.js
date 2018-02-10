/* eslint-disable react/display-name */
/* eslint-disable react/no-multi-comp */

import React from 'react';

import { ROUTE_USERS } from './duck';
import { UsersPage } from './components';

const routes = {
  [ROUTE_USERS]: {
    path: '/users',
    component: () => <UsersPage />,
    roles: ['root'],
  },
};

export default routes;
