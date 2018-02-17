import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { PageTitle } from '../../../shared';
import { showSel } from '../../duck';
import ShowDetails from '../ShowDetails';

const ShowPage = ({ title }) => {
  return (
    <React.Fragment>
      <PageTitle>{title}</PageTitle>
      <ShowDetails />
    </React.Fragment>
  );
};

ShowPage.propTypes = {
  title: PropTypes.string,
};

const mapState = state => ({
  title: showSel(state).title,
});

export default connect(mapState)(ShowPage);
