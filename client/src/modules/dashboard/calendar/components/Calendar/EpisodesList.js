import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { Tooltip, ShowTypeIcon } from '../../../../shared';
import { episodeLabel } from '../../../../utils';
import { MarkWatchedButton, PostponeButton } from '../../../../showOperations';
import styles from './EpisodesList.css';

const EpisodesList = ({ episodes }) => {
  return episodes.map(e => {
    const title = `${e.title} ${episodeLabel(e.season, e.episode)}`;

    return (
      <Tooltip
        key={e.episodeId}
        mouseEnterDelay={0.1}
        trigger="hover click"
        title={
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
        }
      >
        <div title={title} className={cn(styles.label, { [styles.watched]: e.watched })}>
          <ShowTypeIcon type={e.type} size="small" />
          {title}
        </div>
      </Tooltip>
    );
  });
};

EpisodesList.propTypes = {
  episodes: PropTypes.array,
};

EpisodesList.defaultProps = {
  episodes: [],
};

export default EpisodesList;
