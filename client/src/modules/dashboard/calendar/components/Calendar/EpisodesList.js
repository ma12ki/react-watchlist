import React from 'react';
import PropTypes from 'prop-types';
import Link from 'redux-first-router-link';
import cn from 'classnames';

import { Aka, Popover, ShowTypeIcon } from '../../../../shared';
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
      const { showId, slug, type, title, aka, recurring, season, episode, episodeId, premiereDate, watched } = e;
      const fullTitle = recurring ? `${title} ${episodeLabel(season, episode)}` : title;

      const content = (
        <div className={styles.popoverContent}>
          <MarkWatchedButton
            showId={showId}
            episodeId={episodeId}
            watched={watched}
            title={fullTitle}
          />
          {recurring && <MarkWatchedBulkButton
            showId={showId}
            season={season}
            episode={episode}
            title={`${fullTitle} ${seasonLabel(season)} through episode ${episode}`}
          />}
          <PostponeButton
            showId={showId}
            season={season}
            episode={episode}
            currentPremiereDate={premiereDate}
            title={fullTitle}
          />
        </div>
      );

    return (
      <Popover
        key={episodeId}
        overlayClassName={styles.popoverOverlay}
        trigger="click"
        title={
          <React.Fragment>
            <ShowTypeIcon type={type} />
            {' '}
            <Link to={`/shows/${slug}`} title="Go to details">{fullTitle}</Link>
            {aka && <Aka size="6">{aka}</Aka>}
          </React.Fragment>
        }
        content={content}
      >
        <div title={fullTitle} className={cn(styles.label, { [styles.watched]: watched })} onClick={stopPropagation}>
          <ShowTypeIcon type={type} size="small" />
          {' '}
          {fullTitle}
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
