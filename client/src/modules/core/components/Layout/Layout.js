import React from 'react';
import PropTypes from 'prop-types';

import Nav from '../Nav';
import styles from './Layout.css';

const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <Nav />
      <div className={styles.contentWrapper}>
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  );
};

Layout.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.any.isRequired,
};

export default Layout;
