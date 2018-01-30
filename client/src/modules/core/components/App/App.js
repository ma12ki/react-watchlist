import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { routes } from '../../../../root';
import LocaleProvider from '../LocaleProvider';
import Layout from '../Layout';
import ToastContainer from '../ToastContainer';
import { ResizeWatcher } from '../../../screen/components';
import styles from './App.css';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

export class App extends Component {
  render() {
    const { page } = this.props;
    const component = routes[page].component();

    return (
      <div className={styles.app}>
        <ResizeWatcher />
        <ToastContainer />
        <LocaleProvider>
          <Layout>
            {component}
          </Layout>
        </LocaleProvider>
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
