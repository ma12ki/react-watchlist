import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import H from '../H';
import styles from './Aka.css';

const Aka = ({ size, children, className }) => {
  const classNames = cn(
    styles.aka,
    className,
  );

  return (
    <H size={size} className={classNames}>
      <span title="also known as">a.k.a.</span>
      {' '}
      {children}
    </H>
  );
};

Aka.propTypes = {
  size: PropTypes.oneOf(['1', '2', '3', '4', '5', '6']),
  className: PropTypes.string,
  children: PropTypes.node,
};

Aka.defaultProps = {
  size: '5',
};

export default Aka;
