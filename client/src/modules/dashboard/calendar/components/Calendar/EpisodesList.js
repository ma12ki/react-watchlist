import React from 'react';
import PropTypes from 'prop-types';
import Link from 'redux-first-router-link';
import cn from 'classnames';

import { Popover, ShowTypeIcon } from '../../../../shared';
import { episodeLabel, seasonLabel } from '../../../../utils';
import { MarkWatchedButton, MarkWatchedBulkButton, PostponeButton } from '../../../../showOperations';
import styles from './EpisodesList.css';

const EpisodesList = ({ episodes }) => {
  return episodes
    .sort((e1, e2) => {
      if (e1.watched && !e2.watched) {
        return 1;
      }
      if (!e1.watched && e2.watched) {
        return -1;
      }
      return 0;
    })
    .map(e => {
      const title = `${e.title} ${episodeLabel(e.season, e.episode)}`;

      const content = (
        <React.Fragment>
          <MarkWatchedButton
            showId={e.showId}
            episodeId={e.episodeId}
            watched={e.watched}
            title={title}
          />
          <MarkWatchedBulkButton
            showId={e.showId}
            season={e.season}
            episode={e.episode}
            title={`${e.title} ${seasonLabel(e.season)} through episode ${e.episode}`}
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
            <Link to={`/shows/${e.slug}`} title="Go to details">{title}</Link>
          </React.Fragment>
        }
        content={content}
      >
        <div title={title} className={cn(styles.label, { [styles.watched]: e.watched })} onClick={stopPropagation}>
          <ShowTypeIcon type={e.type} size="small" />
          {' '}
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
