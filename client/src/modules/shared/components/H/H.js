import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './H.css';

const H = ({ size, bold, color, inline, inlineBlock, children, className, ...rest }) => {
  const elem = `h${size}`;

  const classNames = cn(
    styles.h,
    styles.block,
    styles[color],
    {
      [styles.bold]: bold,
      [styles.inline]: inline,
      [styles.inlineBlock]: inlineBlock,
    },
    className,
  );

  return React.createElement(elem, { className: classNames, ...rest }, children);
};

H.propTypes = {
  size: PropTypes.oneOf(['1', '2', '3', '4', '5', '6']).isRequired,
  bold: PropTypes.bool,
  color: PropTypes.oneOf(['default', 'primary', 'secondary', 'tertiary']),
  inline: PropTypes.bool,
  inlineBlock: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
};

H.defaultProps = {
  bold: false,
  color: 'default',
  inline: false,
  inlineBlock: false,
};

export default H;
