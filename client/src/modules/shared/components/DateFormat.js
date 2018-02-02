import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const DateFormat = ({ value, format }) => (
  <span>{moment(value).format(format)}</span>
);

DateFormat.propTypes = {
  value: PropTypes.string.isRequired,
  format: PropTypes.string,
};

DateFormat.defaultProps = {
  format: 'DD.MM.YYYY',
};

export default DateFormat;
