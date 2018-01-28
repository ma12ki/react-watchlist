import React from 'react';

import { Available } from '../../available';
import { Upcoming } from '../../upcoming';
import { Calendar } from '../../calendar';

const DashboardPage = () => {
  return (
    <React.Fragment>
      <Calendar />
      <Available />
      <Upcoming />
    </React.Fragment>
  );
};

export default DashboardPage;
