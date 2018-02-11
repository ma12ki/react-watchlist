import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import moment from 'moment';

import EpisodesList from './EpisodesList';
import styles from './CalendarCell.css';

const CalendarCell = ({ cellDate, selectedMonth, episodes }) => {
  const now = moment();
  const isPastDate = now.isAfter(cellDate, 'day');
  const isToday = now.isSame(cellDate, 'day');
  const isFutureDate = now.isBefore(cellDate, 'day');

  const isSelectedMonth = selectedMonth.isSame(cellDate, 'month');

  const isWeekend = [6, 7].includes(cellDate.isoWeekday());
  const dayOfMonth = moment(cellDate).format('DD');

  const containerClassNames = cn(
    styles.container,
    {
      [styles.containerPast]: isPastDate,
      [styles.containerToday]: isToday,
      [styles.containerFuture]: isFutureDate,
      [styles.containerSelectedMonth]: isSelectedMonth,
    },
  );
  const dayOfMonthClassNames = cn(
    styles.dayOfMonth,
    {
      [styles.dayOfMonthToday]: isToday,
      [styles.dayOfMonthSelected]: isSelectedMonth,
      [styles.dayOfMonthWeekend]: isWeekend,
    }
  );
  const episodesClassNames = cn(
    styles.episodes,
    {
      [styles.episodesSelectedMonth]: isSelectedMonth,
      [styles.episodesFuture]: isFutureDate,
    }
  );

  return (
    <div className={containerClassNames}>
      <div className={dayOfMonthClassNames}>{dayOfMonth}</div>
      <div className={episodesClassNames}>
        <EpisodesList episodes={episodes} />
      </div>
    </div>
  );
};

CalendarCell.propTypes = {
  cellDate: PropTypes.object.isRequired,
  selectedMonth: PropTypes.object.isRequired,
  episodes: PropTypes.array,
};

export default CalendarCell;
