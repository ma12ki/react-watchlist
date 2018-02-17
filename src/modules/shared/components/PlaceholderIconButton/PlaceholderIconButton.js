import React from 'react';
import ReportProblemIcon from 'material-ui-icons/ReportProblem';

import IconButton from '../IconButton';
import styles from './PlaceholderIconButton.css';

const PlaceholderIconButton = () => (
  <IconButton className={styles.invisible}>
    <ReportProblemIcon />
  </IconButton>
);

export default PlaceholderIconButton;
