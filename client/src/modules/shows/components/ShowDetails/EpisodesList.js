import React from 'react';
import PropTypes from 'prop-types';
// import cn from 'classnames';

import { episodeLabel, seasonLabel, groupEpisodes } from '../../../utils';
import { DateFormat, SeasonLabel, Tree } from '../../../shared';
import { MarkWatchedButton, DeleteEpisodesButton, PostponeButton } from '../../../showOperations';
// import styles from './EpisodesList.css';

const { TreeNode } = Tree;

const EpisodesList = ({ showId, title, episodes }) => {
  const seasons = groupEpisodes(episodes);
  const seasonNodes = seasons.map(episodes => {
    const { season } = episodes[0];
    const lastIndex = episodes.length - 1;
    const episodeNodes = episodes.map(({
      episodeId,
      episode,
      premiereDate,
      watched,
    }, index) => (
      <TreeNode
        key={episodeId}
        selectable={false}
        isLeaf
        title={
          <React.Fragment>
            {episodeLabel(season, episode)}{' '}-{' '}<DateFormat value={premiereDate} />
            <MarkWatchedButton
              showId={showId}
              episodeId={episodeId}
              watched={watched}
              title={`${title} ${episodeLabel(season, episode)}`}
            />
            <PostponeButton
              showId={showId}
              season={season}
              episode={episode}
              currentPremiereDate={premiereDate}
              title={`${title} ${episodeLabel(season, episode)}`}
            />
            {index === lastIndex && <DeleteEpisodesButton
              showId={showId}
              season={season}
              episode={episode}
              title={`${title} ${episodeLabel(season, episode)}`}
            />}
          </React.Fragment>
        }
      />
    ));

    return (
      <TreeNode
        key={season}
        title={
          <React.Fragment>
            <SeasonLabel season={season} />
            <DeleteEpisodesButton
              showId={showId}
              season={season}
              title={`${title} ${seasonLabel(season)}`}
            />
          </React.Fragment>
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
