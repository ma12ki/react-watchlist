import React from 'react';

import { PageTitle } from '../../../shared';
import AllShows from '../AllShows';

const ShowsPage = () => {
  return (
    <React.Fragment>
      <PageTitle>All</PageTitle>
      <AllShows />
    </React.Fragment>
  );
};

export default ShowsPage;
