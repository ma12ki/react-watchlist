import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';

import { Calendar as BaseCalendar } from '../../../../shared';
import { episodesRequest, setCalendarDates, episodesSel, loadingSel } from '../../duck';

class Calendar extends React.Component {
  componentDidMount() {
    this.props.onLoadEpisodes();
  }

  handleDateChange = date => {
    const { from, to } = this.getDateRange(date);
    this.props.onSetDates(from, to);
  }

  getDateRange = baseDate => {
    return {
      from: moment(baseDate).startOf('month').subtract(14, 'days').startOf('day'),
      to: moment(baseDate).endOf('month').add(14, 'days').endOf('day'),
    };
  }

  render() {
    return <BaseCalendar onPanelChange={this.handleDateChange} onSelect={this.handleDateChange} />;
  }
}

Calendar.propTypes = {
  episodes: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  onLoadEpisodes: PropTypes.func.isRequired,
  onSetDates: PropTypes.func.isRequired,
};

const mapState = state => ({
  episodes: episodesSel(state),
  loading: loadingSel(state),
});

const mapDispatch = dispatch => ({
  onLoadEpisodes: () => dispatch(episodesRequest()),
  onSetDates: (from, to) => dispatch(setCalendarDates(from, to))
});

export default connect(mapState, mapDispatch)(Calendar);
