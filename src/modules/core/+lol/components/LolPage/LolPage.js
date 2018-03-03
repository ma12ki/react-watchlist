import React from 'react';

import { H, PageTitle } from '../../../../shared';
import styles from './LolPage.css';

const LolPage = () => {
  return (
    <React.Fragment>
      <PageTitle>LOL</PageTitle>
      <div className={styles.header}>
        <H size="1">OMFG LOL</H>
      </div>
    </React.Fragment>
  );
};

export default LolPage;
