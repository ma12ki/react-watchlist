/* eslint-disable react/display-name */
/* eslint-disable react/no-multi-comp */

import React from 'react';
import { NOT_FOUND } from 'redux-first-router';

import { routes as dashboardRoutes } from '../dashboard';
import { routes as showsRoutes } from '../shows';
import { routes as userRoutes } from '../user';
import { NotFound } from '../shared';
import { ModuleLoader } from './components';

export default {
  ...dashboardRoutes,
  ...showsRoutes,
  ...userRoutes,
  [NOT_FOUND]: {
    component: () => <NotFound />
  },
  'users/ROUTE_USERS': {
    path: '/users',
    component: () => <ModuleLoader importFn={() => import('../+users')} rootComponentName="UsersPage" />,
    roles: ['root'],
  },
  'lol/ROUTE_LOL': {
    path: '/lol',
    component: () => <ModuleLoader importFn={() => import('./+lol')} rootComponentName="LolPage" />,
  }
};
