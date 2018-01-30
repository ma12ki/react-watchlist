import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { Tooltip } from '../../../../shared';
import { MarkWatched } from '../../../../episodeActions';
import styles from './CalendarCell.css';

const CalendarCell = ({ showId, episodeId, title, season, episode, watched }) => {
  const fullText = `${title} S${season}E${episode}`;

  return (
    <Tooltip
      mouseEnterDelay={0.1}
      trigger="hover click"
      title={<MarkWatched showId={showId} episodeId={episodeId} watched={watched} />}
    >
      <div title={fullText} className={cn(styles.label, { [styles.watched]: watched })}>
        {fullText}
      </div>
    </Tooltip>
  );
};

CalendarCell.propTypes = {
  showId: PropTypes.string.isRequired,
  episodeId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  season: PropTypes.number.isRequired,
  episode: PropTypes.number.isRequired,
  watched: PropTypes.bool.isRequired,
};

export default CalendarCell;
