/* eslint-disable react/display-name */
/* eslint-disable react/no-multi-comp */

import React from 'react';
import { NOT_FOUND } from 'redux-first-router';

import { routes as dashboardRoutes } from '../dashboard';
import { routes as userRoutes } from '../user';
import { NotFound } from '../shared';
import { ModuleLoader } from './components';

export default {
  ...dashboardRoutes,
  ...userRoutes,
  'shows/ROUTE_SHOW_DETAILS': {
    path: '/shows/:slug',
    component: () => <ModuleLoader key="shows/ROUTE_SHOW_DETAILS" importFn={() => import('../+shows')} rootComponentName="ShowPage" />,
    roles: ['root', 'admin', 'user'],
  },
  'shows/ROUTE_ALL_SHOWS': {
    path: '/shows',
    component: () => <ModuleLoader key="shows/ROUTE_ALL_SHOWS" importFn={() => import('../+shows')} rootComponentName="ShowsPage" />,
    roles: ['root', 'admin', 'user'],
  },
  'users/ROUTE_USERS': {
    path: '/users',
    component: () => <ModuleLoader key="users/ROUTE_USERS" importFn={() => import('../+users')} rootComponentName="UsersPage" />,
    roles: ['root'],
  },
  'lol/ROUTE_LOL': {
    path: '/lol',
    component: () => <ModuleLoader key="lol/ROUTE_LOL" importFn={() => import('./+lol')} rootComponentName="LolPage" />,
  },
  [NOT_FOUND]: {
    component: () => <NotFound />
  },
};
