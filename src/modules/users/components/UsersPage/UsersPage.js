import React from 'react';

import { H, PageTitle } from '../../../shared';
import AllUsers from '../AllUsers';
import styles from './UserPage.css';

const UsersPage = () => {
  return (
    <React.Fragment>
      <PageTitle>Users</PageTitle>
      <div className={styles.header}>
        <H size="1">User whitelist</H>
      </div>
      <AllUsers />
    </React.Fragment>
  );
};

export default UsersPage;
