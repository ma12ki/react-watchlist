import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';

import { Calendar as BaseCalendar, H } from '../../../../shared';
import { episodesRequest, setCalendarDates, episodesSel, loadingSel, datesSel } from '../../duck';
import CalendarCell from './CalendarCell';
import styles from './Calendar.css';

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

  getDateRange = baseDate => ({
    from: moment(baseDate).startOf('month').subtract(7, 'days').startOf('day'),
    to: moment(baseDate).endOf('month').add(14, 'days').endOf('day'),
  })

  getSelectedMonth = () => {
    const { from } = this.props.dates;

    return moment(from).add(1, 'month').startOf('month');
  }

  renderFullCell = date => {
    const { episodes } = this.props;
    const episodesForDate = episodes.filter(e => moment(date).isSame(e.premiereDate, 'day'));
    const selectedMonth = this.getSelectedMonth();

    return (
      <CalendarCell
        cellDate={date}
        selectedMonth={selectedMonth}
        episodes={episodesForDate}
      />
    );
  }

  render() {
    const { loading } = this.props;
    const selectedMonth = moment(this.getSelectedMonth()).format('MMMM YYYY');

    return (
      <div className={styles.container}>
        <H size="2" className={styles.header}>{selectedMonth}</H>
        <BaseCalendar
          className={styles.calendar}
          disabledDate={() => loading}
          dateCellRender={() => {}}
          dateFullCellRender={this.renderFullCell}
          onPanelChange={this.handleDateChange}
          onSelect={this.handleDateChange}
        />
      </div>
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
