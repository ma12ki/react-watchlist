import React from 'react';

import { H, PageTitle } from '../../../shared';
import LoginForm from '../LoginForm';
import styles from './LoginPage.css';

const LoginPage = () => {
  return (
    <div className={styles.container}>
      <PageTitle>Login</PageTitle>
      <LoginForm />
      <H size="3" className={styles.info}>Whitelist only!</H>
    </div>
  );
};

export default LoginPage;
