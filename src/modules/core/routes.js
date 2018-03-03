/* eslint-disable react/display-name */
/* eslint-disable react/no-multi-comp */

import React from 'react';
import { NOT_FOUND } from 'redux-first-router';

import { routes as dashboardRoutes } from '../dashboard';
import { routes as userRoutes } from '../user';
import { NotFound } from '../shared';
import { ModuleLoader } from './components';

const importShows = () => import('../+shows');
const importUsers = () => import('../+users');

export default {
  ...dashboardRoutes,
  ...userRoutes,
  'shows/ROUTE_SHOW_DETAILS': {
    path: '/shows/:slug',
    component: () => <ModuleLoader importFn={importShows} rootComponentName="ShowPage" />,
    roles: ['root', 'admin', 'user'],
  },
  'shows/ROUTE_ALL_SHOWS': {
    path: '/shows',
    component: () => <ModuleLoader importFn={importShows} rootComponentName="ShowsPage" />,
    roles: ['root', 'admin', 'user'],
  },
  'users/ROUTE_USERS': {
    path: '/users',
    component: () => <ModuleLoader importFn={importUsers} rootComponentName="UsersPage" />,
    roles: ['root'],
  },
  [NOT_FOUND]: {
    component: () => <NotFound />
  },
};
