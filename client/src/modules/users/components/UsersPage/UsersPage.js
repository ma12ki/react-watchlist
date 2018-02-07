import React from 'react';

import AllUsers from '../AllUsers';

import { H } from '../../../shared';
import styles from './UserPage.css';

const UsersPage = () => {
  return (
    <React.Fragment>
      <div className={styles.header}>
        <H size="1">User whitelist</H>
      </div>
      <AllUsers />
    </React.Fragment>
  );
};

export default UsersPage;
