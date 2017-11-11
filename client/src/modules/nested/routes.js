/* eslint-disable react/display-name */
/* eslint-disable react/no-multi-comp */

import React from 'react';

import * as actionTypes from './actionTypes';
import { Parent } from './components';

const routes = {
  [actionTypes.ROUTE_NESTED]: {
    path: '/nested/:child?/:grandchild?',
    component: () => <Parent />,
  },
};

export default routes;
