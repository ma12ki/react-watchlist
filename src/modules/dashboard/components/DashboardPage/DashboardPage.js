import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { PageTitle } from '../../../shared';
import { isDesktopSel } from '../../../screen';
import { Calendar } from '../../calendar';
import { Timeline } from '../../timeline';
import { effectiveViewSel } from '../../duck';
import ViewSelector from '../ViewSelector';

const DashboardPage = ({ view, isDesktop }) => {
  return (
    <React.Fragment>
      <PageTitle>Dashboard</PageTitle>
      {isDesktop && <ViewSelector />}
      {view === 'calendar' && <Calendar />}
      {view === 'timeline' && <Timeline />}
    </React.Fragment>
  );
};

DashboardPage.propTypes = {
  isDesktop: PropTypes.bool.isRequired,
  view: PropTypes.string.isRequired,
};

const mapState = state => ({
  isDesktop: isDesktopSel(state),
  view: effectiveViewSel(state),
});

export default connect(mapState)(DashboardPage);
