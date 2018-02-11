import React from 'react';

import { PageTitle } from '../../../shared';
import { Calendar } from '../../calendar';

const DashboardPage = () => {
  return (
    <React.Fragment>
      <PageTitle>Dashboard</PageTitle>
      <Calendar />
    </React.Fragment>
  );
};

export default DashboardPage;
