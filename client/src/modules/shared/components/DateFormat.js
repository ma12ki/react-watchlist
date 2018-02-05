import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const DateFormat = ({ value, format, fromNowTitle }) => {
  const title = fromNowTitle ? moment(value).fromNow() : '';

  return <span title={title}>{moment(value).format(format)}</span>;
};

DateFormat.propTypes = {
  value: PropTypes.string.isRequired,
  format: PropTypes.string,
  fromNowTitle: PropTypes.bool,
};

DateFormat.defaultProps = {
  format: 'DD.MM.YYYY',
  fromNowTitle: false,
};

export default DateFormat;
