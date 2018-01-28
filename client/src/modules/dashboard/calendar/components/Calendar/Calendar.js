import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';

import { Calendar as BaseCalendar } from '../../../../shared';
import { episodesRequest, setCalendarDates, episodesSel, loadingSel, datesSel } from '../../duck';

class Calendar extends React.Component {
  componentDidMount() {
    this.props.onLoadEpisodes();
  }

  handleDateChange = date => {
    const { from, to } = this.getDateRange(date);
    const { dates } = this.props;

    if (!moment(from).isSame(dates.from) || !moment(to).isSame(dates.to)) {
      this.props.onSetDates(from, to);
    }
  }

  getDateRange = baseDate => {
    return {
      from: moment(baseDate).startOf('month').subtract(14, 'days').startOf('day'),
      to: moment(baseDate).endOf('month').add(14, 'days').endOf('day'),
    };
  }

  renderCell = date => {
    const { episodes } = this.props;

    return episodes
      .filter(e => moment(date).isSame(e.premiereDate, 'day'))
      .map(e => {
        return (
          <div key={e.episodeId}>
            {e.title}
          </div>
        );
      });
  }

  render() {
    const { loading } = this.props;

    return (
      <BaseCalendar
        onPanelChange={this.handleDateChange}
        onSelect={this.handleDateChange}
        disabledDate={() => loading}
        dateCellRender={this.renderCell}
      />
    );
  }
}

Calendar.propTypes = {
  episodes: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  dates: PropTypes.object.isRequired,
  onLoadEpisodes: PropTypes.func.isRequired,
  onSetDates: PropTypes.func.isRequired,
};

const mapState = state => ({
  episodes: episodesSel(state),
  loading: loadingSel(state),
  dates: datesSel(state),
});

const mapDispatch = dispatch => ({
  onLoadEpisodes: () => dispatch(episodesRequest()),
  onSetDates: (from, to) => dispatch(setCalendarDates(from, to))
});

export default connect(mapState, mapDispatch)(Calendar);
