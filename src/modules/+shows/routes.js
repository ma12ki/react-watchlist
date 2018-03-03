/* eslint-disable react/display-name */
/* eslint-disable react/no-multi-comp */

import React from 'react';

import { ROUTE_ALL_SHOWS, ROUTE_SHOW_DETAILS } from './duck';
import { ShowsPage, ShowPage } from './components';

const routes = {
  [ROUTE_SHOW_DETAILS]: {
    path: '/shows/:slug',
    component: () => <ShowPage />,
    roles: ['root', 'admin', 'user'],
  },
  [ROUTE_ALL_SHOWS]: {
    path: '/shows',
    component: () => <ShowsPage />,
    roles: ['root', 'admin', 'user'],
  },
};

export default routes;
