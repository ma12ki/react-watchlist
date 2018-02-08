import React from 'react';

import { H } from '../../../shared';
import LoginForm from '../LoginForm';
import styles from './LoginForm.css';

const LoginPage = () => {
  return (
    <div className={styles.container}>
      <LoginForm />
      <H size="3" className={styles.info}>Whitelist only!</H>
    </div>
  );
};

export default LoginPage;
