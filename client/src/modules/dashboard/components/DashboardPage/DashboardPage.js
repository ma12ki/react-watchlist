import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { PageTitle } from '../../../shared';
import { Calendar } from '../../calendar';
import { Timeline } from '../../timeline';
import { effectiveViewSel } from '../../duck';
import ViewSelector from '../ViewSelector';

const DashboardPage = ({ view }) => {
  return (
    <React.Fragment>
      <PageTitle>Dashboard</PageTitle>
      <ViewSelector />
      {view === 'calendar' && <Calendar />}
      {view === 'timeline' && <Timeline />}
    </React.Fragment>
  );
};

DashboardPage.propTypes = {
  view: PropTypes.string.isRequired,
};

const mapState = state => ({
  view: effectiveViewSel(state),
});

export default connect(mapState)(DashboardPage);
