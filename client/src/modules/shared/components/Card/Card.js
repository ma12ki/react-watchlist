import React from 'react';
import PropTypes from 'prop-types';
import { Card as AntCard } from 'antd';

const Card = ({ bordered, hoverable, ...rest }) => {
  return <AntCard bordered={bordered} hoverable={hoverable} {...rest} />;
};

Card.propTypes = {
  bordered: PropTypes.bool,
  hoverable: PropTypes.bool,
};

Card.defaultProps = {
  bordered: false,
  hoverable: false,
};

export default Card;
