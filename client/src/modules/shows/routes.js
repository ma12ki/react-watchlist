/* eslint-disable react/display-name */
/* eslint-disable react/no-multi-comp */

import React from 'react';

import { ROUTE_ALL_SHOWS, ROUTE_SHOW_DETAILS } from './duck';
import { ShowsPage, ShowPage } from './components';

const routes = {
  [ROUTE_SHOW_DETAILS]: {
    path: '/shows/:showId',
    component: () => <ShowPage />,
  },
  [ROUTE_ALL_SHOWS]: {
    path: '/shows',
    component: () => <ShowsPage />,
  },
};

export default routes;
