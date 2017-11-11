/* eslint-disable import/no-named-as-default */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { routes } from '../../../../root';
import Nav from '../Nav';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

export class App extends Component {
  render() {
    const { page } = this.props;
    const component = routes[page].component();

    return (
      <div>
        <Nav />
        {component}
      </div>
    );
  }
}

App.propTypes = {
  page: PropTypes.string,
};

const mapStateToProps = (state) => ({
  page: state.location.type,
});

export default connect(mapStateToProps)(App);
