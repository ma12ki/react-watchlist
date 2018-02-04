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
    const { value } = this.props;
    const internalValue = value ? moment(value[0].premiereDate) : undefined;

    return <DatePicker value={internalValue} onChange={this.handleChange} />;
  }
}

PremiereDateInput.propTypes = {
  value: PropTypes.array,
  onChange: PropTypes.func,
};

export default PremiereDateInput;
