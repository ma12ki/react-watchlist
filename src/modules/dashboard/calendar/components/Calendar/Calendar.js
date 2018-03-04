import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import ChevronRightIcon from 'material-ui-icons/ChevronRight';
import TodayIcon from 'material-ui-icons/Today';

import { Calendar as BaseCalendar, IconButton, Spin } from '../../../../shared';
import { episodesRequest, setCalendarDates, episodesSel, loadingSel, datesSel } from '../../duck';
import CalendarCell from './CalendarCell';
import styles from './Calendar.css';

class Calendar extends React.Component {
  componentDidMount() {
    this.props.onLoadEpisodes();
  }

  handleNextMonth = () => {
    const selectedMonth = this.getSelectedMonth();

    this.handleDateChange(moment(selectedMonth).add(1, 'month'));
  }

  handlePrevMonth = () => {
    const selectedMonth = this.getSelectedMonth();

    this.handleDateChange(moment(selectedMonth).subtract(1, 'month'));
  }

  handleCurrentMonth = () => {
    this.handleDateChange(moment());
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
    const selectedMonth = this.getSelectedMonth();

    return (
      <div className={styles.container}>
        <IconButton
          className={styles.prevMonth}
          title="Previous month"
          disabled={loading}
          onClick={this.handlePrevMonth}
        >
          <ChevronLeftIcon />
        </IconButton>
        <IconButton
          className={styles.nextMonth}
          title="Next month"
          disabled={loading}
          onClick={this.handleNextMonth}
        >
          <ChevronRightIcon />
        </IconButton>
        <IconButton
          className={styles.currentMonth}
          title="Current month"
          disabled={loading}
          onClick={this.handleCurrentMonth}
        >
          <TodayIcon />
        </IconButton>
        <Spin size="large" spinning={loading} delay={200}>
          <BaseCalendar
            className={styles.calendar}
            value={selectedMonth}
            dateCellRender={() => {}}
            dateFullCellRender={this.renderFullCell}
          />
        </Spin>
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
  episodes: mapEpisodes(episodesSel(state)),
  loading: loadingSel(state),
  dates: datesSel(state),
});

const mapEpisodes = episodes => episodes.map(e => ({
  ...e,
  prevEpisodesWatched: getPrevEpisodesWatched(episodes, e.showId, e.season, e.episode)
}));

const getPrevEpisodesWatched = (episodes, showId, season, episode) => episodes
  .filter(e => e.showId === showId && ((e.season === season && e.episode < episode) || (e.season < season)))
  .reduce((watched, e) => watched && e.watched, true);

const mapDispatch = dispatch => ({
  onLoadEpisodes: () => dispatch(episodesRequest()),
  onSetDates: (from, to) => dispatch(setCalendarDates(from, to))
});

export default connect(mapState, mapDispatch)(Calendar);
