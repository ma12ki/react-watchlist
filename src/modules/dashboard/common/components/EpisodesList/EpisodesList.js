import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Link from 'redux-first-router-link';
import cn from 'classnames';

import { Aka, Popover, ShowTypeIcon } from '../../../../shared';
import { isAtLeastAdminSel } from '../../../../user';
import { episodeLabel, seasonLabel } from '../../../../utils';
import { MarkWatchedButton, MarkWatchedBulkButton, PostponeButton } from '../../../../showOperations';
import styles from './EpisodesList.css';

const EpisodesList = ({ episodes, isAtLeastAdmin }) => {
  return episodes
    .sort(sortEpisodes)
    .map(e => {
      const { showId, slug, type, title, aka, recurring, season, episode, episodeId, premiereDate, watched, prevEpisodesWatched } = e;
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
            watched={watched && prevEpisodesWatched}
            title={`${fullTitle} ${seasonLabel(season)} through episode ${episode}`}
          />}
          {isAtLeastAdmin && <PostponeButton
            showId={showId}
            season={season}
            episode={episode}
            currentPremiereDate={premiereDate}
            title={fullTitle}
          />}
        </div>
      );

    return (
      <Popover
        key={episodeId}
        overlayClassName={styles.popoverOverlay}
        trigger="click"
        placement="bottomLeft"
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

const sortEpisodes = (e1, e2) => [sortWatched, sortTitle, sortNumber('season'), sortNumber('episode')]
  .reduce((sort, sortFn) => {
    if (sort !== 0) {
      return sort;
    }
    return sortFn(e1, e2);
  }, 0);

const sortWatched = (e1, e2) => {
  if (e1.watched && !e2.watched) {
    return 1;
  }
  if (!e1.watched && e2.watched) {
    return -1;
  }
  return 0;
};

const sortTitle = (e1, e2) => {
  const titleE1 = e1.title.toLowerCase();
  const titleE2 = e2.title.toLowerCase();

  if (titleE1 < titleE2) {
    return -1;
  }
  if (titleE1 > titleE2) {
    return 1;
  }
  return 0;
};

const sortNumber = (key) => (e1, e2) => e1[key] - e2[key];

const stopPropagation = e => e.stopPropagation();

EpisodesList.propTypes = {
  isAtLeastAdmin: PropTypes.bool.isRequired,
  episodes: PropTypes.array,
};

EpisodesList.defaultProps = {
  episodes: [],
};

const mapState = state => ({
  isAtLeastAdmin: isAtLeastAdminSel(state),
});

export default connect(mapState)(EpisodesList);
