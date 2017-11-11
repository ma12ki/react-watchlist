/* eslint-disable react/display-name */
/* eslint-disable react/no-multi-comp */

import React from 'react';
import { NOT_FOUND } from 'redux-first-router';

import { routes as blogRoutes } from '../modules/blog';
import { routes as dashboardRoutes } from '../modules/dashboard';
import { routes as nestedRoutes } from '../modules/nested';
import { components as coreComponents } from '../modules/core';

export default {
  ...blogRoutes,
  ...dashboardRoutes,
  ...nestedRoutes,
  [NOT_FOUND]: {
    component: () => <coreComponents.NotFound />
  },
};
