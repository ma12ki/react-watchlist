import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './FlexSpacer.css';

const FlexSpacer = ({ className }) => <div className={cn(styles.spacer, className)} />;

FlexSpacer.propTypes = {
  className: PropTypes.string,
};

export default FlexSpacer;
