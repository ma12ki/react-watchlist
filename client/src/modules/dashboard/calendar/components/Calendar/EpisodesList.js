import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { Popover, ShowTypeIcon } from '../../../../shared';
import { episodeLabel } from '../../../../utils';
import { MarkWatchedButton, PostponeButton } from '../../../../showOperations';
import styles from './EpisodesList.css';

const EpisodesList = ({ episodes }) => {
  return episodes.map(e => {
    const title = `${e.title} ${episodeLabel(e.season, e.episode)}`;

    const content = (
      <React.Fragment>
        <MarkWatchedButton
          showId={e.showId}
          episodeId={e.episodeId}
          watched={e.watched}
          title={title}
        />
        <PostponeButton
          showId={e.showId}
          season={e.season}
          episode={e.episode}
          currentPremiereDate={e.premiereDate}
          title={title}
        />
      </React.Fragment>
    );

    return (
      <Popover
        key={e.episodeId}
        overlayClassName={styles.popoverOverlay}
        trigger="click"
        title={
          <React.Fragment>
            <ShowTypeIcon type={e.type} />
            {' '}
            {title}
          </React.Fragment>
        }
        content={content}
      >
        <div title={title} className={cn(styles.label, { [styles.watched]: e.watched })} onClick={stopPropagation}>
          {title}
        </div>
      </Popover>
    );
  });
};

const stopPropagation = e => e.stopPropagation();

EpisodesList.propTypes = {
  episodes: PropTypes.array,
};

EpisodesList.defaultProps = {
  episodes: [],
};

export default EpisodesList;
