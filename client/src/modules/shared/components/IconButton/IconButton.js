import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import cn from 'classnames';

// import styles from './ActionButton.css';

const ActionButton = ({ bordered, hoverable, padding, transparent, className, ...rest }) => {
  const classNames = cn(
    className,
    {
      [styles.noPad]: !padding,
      [styles.transparent]: transparent,
    },
  );

  return <AntActionButton bordered={bordered} hoverable={hoverable} className={classNames} {...rest} />;
};

ActionButton.propTypes = {
  bordered: PropTypes.bool,
  hoverable: PropTypes.bool,
  padding: PropTypes.bool,
  transparent: PropTypes.bool,
  className: PropTypes.string,
};

ActionButton.defaultProps = {
  bordered: false,
  hoverable: false,
  padding: false,
  transparent: true,
};

export default ActionButton;
