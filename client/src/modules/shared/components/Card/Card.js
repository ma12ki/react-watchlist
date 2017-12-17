import React from 'react';
import PropTypes from 'prop-types';
import { Card as AntCard } from 'antd';

const Card = ({ bordered, ...rest }) => {
  return <AntCard bordered={bordered} {...rest} />;
};

Card.propTypes = {
  bordered: PropTypes.bool,
};

Card.defaultProps = {
  bordered: false,
};

export default Card;
