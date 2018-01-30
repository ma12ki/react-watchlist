/* eslint-disable react/display-name */
/* eslint-disable react/no-multi-comp */

import React from 'react';

import { ROUTE_ALL_SHOWS } from './duck';
import { ShowsPage } from './components';

const routes = {
  [ROUTE_ALL_SHOWS]: {
    path: '/shows',
    component: () => <ShowsPage />,
  },
};

export default routes;
