import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { episodeLabel, seasonLabel, groupEpisodes } from '../../../utils';
import { DateFormat, EpisodeLabel, SeasonLabel, Tree, FlexSpacer, PlaceholderIconButton } from '../../../shared';
import { MarkWatchedButton, MarkWatchedBulkButton, DeleteEpisodesButton, PostponeButton } from '../../../showOperations';
import styles from './EpisodesList.css';

const { TreeNode } = Tree;

const EpisodesList = ({ showId, title, episodes }) => {
  const seasons = groupEpisodes(episodes);
  const seasonNodes = seasons.map(episodes => {
    const { season } = episodes[0];
    const lastIndex = episodes.length - 1;
    const seasonWatched = episodes.reduce((watched, e) => watched && e.watched, true);
    let seasonUpToEpWatched = true;
    const episodeNodes = episodes.map(({
      episodeId,
      episode,
      premiereDate,
      watched,
    }, index) => {
      seasonUpToEpWatched = seasonUpToEpWatched && watched;
      const canDelete = index === lastIndex && episodes.length > 1;
      const classNames = cn(
        styles.episodeRow,
        { [styles.watched]: watched },
      );
      return (
        <TreeNode
          key={episodeId}
          selectable={false}
          isLeaf
          title={
            <div className={classNames}>
              <div>
                <EpisodeLabel season={season} episode={episode} />{' '}-{' '}<DateFormat value={premiereDate} fromNowTitle />
              </div>
              <FlexSpacer />
              <div className={styles.actionButtons}>
                <MarkWatchedButton
                  showId={showId}
                  episodeId={episodeId}
                  watched={watched}
                  title={`${title} ${episodeLabel(season, episode)}`}
                />
                <MarkWatchedBulkButton
                  showId={showId}
                  season={season}
                  episode={episode}
                  watched={seasonUpToEpWatched}
                  title={`${title} ${seasonLabel(season)} through episode ${episode}`}
                />
                <PostponeButton
                  showId={showId}
                  season={season}
                  episode={episode}
                  currentPremiereDate={premiereDate}
                  title={`${title} ${episodeLabel(season, episode)}`}
                />
                {canDelete && <DeleteEpisodesButton
                  showId={showId}
                  season={season}
                  episode={episode}
                  title={`${title} ${episodeLabel(season, episode)}`}
                /> || <PlaceholderIconButton />}
              </div>
            </div>
          }
        />
      );
    });

    const canDelete = seasons.length > 1;
    const classNames = cn(
      styles.seasonRow,
      { [styles.watched]: seasonWatched },
    );

    return (
      <TreeNode
        key={season}
        title={
          <div className={classNames}>
            <SeasonLabel season={season} />
            <FlexSpacer />
            <div className={styles.actionButtons}>
              <MarkWatchedBulkButton
                showId={showId}
                season={season}
                watched={seasonWatched}
                title={`${title} ${seasonLabel(season)}`}
              />
              <PlaceholderIconButton />
              {canDelete && <DeleteEpisodesButton
                showId={showId}
                season={season}
                title={`${title} ${seasonLabel(season)}`}
              /> || <PlaceholderIconButton />}
            </div>
          </div>
        }
        selectable={false}
      >
        {episodeNodes}
      </TreeNode>
    );
  });

  return (
    <Tree defaultExpandAll>
      {seasonNodes}
    </Tree>
  );
};

EpisodesList.propTypes = {
  showId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  episodes: PropTypes.array.isRequired,
};

export default EpisodesList;
