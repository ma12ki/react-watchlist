import React from 'react';
import PropTypes from 'prop-types';
import { Card as AntCard } from 'antd';
import cn from 'classnames';

import styles from './Card.css';

const Card = ({ bordered, hoverable, padding, transparent, className, ...rest }) => {
  const classNames = cn(
    className,
    {
      [styles.noPad]: !padding,
      [styles.transparent]: transparent,
    },
  );

  return <AntCard bordered={bordered} hoverable={hoverable} className={classNames} {...rest} />;
};

Card.propTypes = {
  bordered: PropTypes.bool,
  hoverable: PropTypes.bool,
  padding: PropTypes.bool,
  transparent: PropTypes.bool,
  className: PropTypes.string,
};

Card.defaultProps = {
  bordered: false,
  hoverable: false,
  padding: false,
  transparent: true,
};

export default Card;
