/* eslint-disable react/display-name */
/* eslint-disable react/no-multi-comp */

import React from 'react';
import { NOT_FOUND } from 'redux-first-router';

import { routes as dashboardRoutes } from '../dashboard';
import { routes as userRoutes } from '../user';
import { NotFound } from '../shared';

const importShowsModule = () => import('../+shows');
const importUsersModule = () => import('../+users');

export default {
  ...dashboardRoutes,
  ...userRoutes,
  'shows/ROUTE_SHOW_DETAILS': {
    path: '/shows/:slug',
    component: importShowsModule,
    componentName: 'ShowPage',
    roles: ['root', 'admin', 'user'],
  },
  'shows/ROUTE_ALL_SHOWS': {
    path: '/shows',
    component: importShowsModule,
    componentName: 'ShowsPage',
    roles: ['root', 'admin', 'user'],
  },
  'users/ROUTE_USERS': {
    path: '/users',
    component: importUsersModule,
    componentName: 'UsersPage',
    roles: ['root'],
  },
  [NOT_FOUND]: {
    component: () => <NotFound />
  },
};
