import React from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import Nav from '../Nav';
import styles from './Layout.css';

const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <Nav />
      <div className={styles.contentWrapper}>
        <div className={styles.content}>
          {children}

          <button onClick={() => toast('omg')}>default</button>
          <button onClick={() => toast.success('omg')}>success</button>
          <button onClick={() => toast.warn('omg')}>warn</button>
          <button onClick={() => toast.info('omg')}>info</button>
          <button onClick={() => toast.error('omg')}>error</button>
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
