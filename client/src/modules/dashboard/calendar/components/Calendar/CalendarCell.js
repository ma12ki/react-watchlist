import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { Tooltip, ShowTypeIcon } from '../../../../shared';
import { episodeLabel } from '../../../../utils';
import { MarkWatchedButton, PostponeButton } from '../../../../showOperations';
import styles from './CalendarCell.css';

const CalendarCell = ({ showId, episodeId, title, type, season, episode, premiereDate, watched }) => {
  const fullText = `${title} ${episodeLabel(season, episode)}`;

  return (
    <Tooltip
      mouseEnterDelay={0.1}
      trigger="hover click"
      title={
        <React.Fragment>
          <MarkWatchedButton
            showId={showId}
            episodeId={episodeId}
            watched={watched}
            title={fullText}
          />
          <PostponeButton
            showId={showId}
            season={season}
            episode={episode}
            currentPremiereDate={premiereDate}
            title={fullText}
          />
        </React.Fragment>
      }
    >
      <div title={fullText} className={cn(styles.label, { [styles.watched]: watched })}>
        <ShowTypeIcon type={type} size="small" />
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
  premiereDate: PropTypes.string.isRequired,
  watched: PropTypes.bool.isRequired,
};

export default CalendarCell;
