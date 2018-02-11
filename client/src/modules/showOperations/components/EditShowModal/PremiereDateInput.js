import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { DatePicker } from '../../../shared';

class PremiereDateInput extends React.Component {
  handleChange = premiereDateMoment => {
    const value = premiereDateMoment ? [{ season: 0, episode: 0, premiereDate: premiereDateMoment.startOf('day').toISOString() }] : undefined;
    this.props.onChange(value);
  }

  render() {
    const { value, disabled } = this.props;
    const internalValue = value && value.length ? moment(value[0].premiereDate).startOf('day') : undefined;

    return <DatePicker value={internalValue} disabled={disabled} onChange={this.handleChange} />;
  }
}

PremiereDateInput.propTypes = {
  value: PropTypes.array,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};

export default PremiereDateInput;
