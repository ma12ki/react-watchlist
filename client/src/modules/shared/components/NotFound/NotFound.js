import React from 'react';
import CakeIcon from 'material-ui-icons/Cake';

import H from '../H';
import styles from './NotFound.css';

const NotFound = () => (
  <div className={styles.container}>
    <H size="2">You found the secret 404 page!</H>
    <H size="3">Here, have some cake:</H>
    <CakeIcon className={styles.cake} />
  </div>
);

export default NotFound;
