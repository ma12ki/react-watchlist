/* eslint-disable react/display-name */
/* eslint-disable react/no-multi-comp */

import React from 'react';
import { NOT_FOUND } from 'redux-first-router';

import { routes as dashboardRoutes } from '../dashboard';
import { routes as showsRoutes } from '../shows';
import { routes as usersRoutes } from '../users';
import { routes as userRoutes } from '../user';
import { NotFound } from '../shared';

export default {
  ...dashboardRoutes,
  ...showsRoutes,
  ...usersRoutes,
  ...userRoutes,
  [NOT_FOUND]: {
    component: () => <NotFound />
  },
};
