import React from 'react';
import PropTypes from 'prop-types';
// import cn from 'classnames';

import { episodeLabel, groupEpisodes } from '../../../utils';
import { DateFormat, SeasonLabel, Tree } from '../../../shared';
import { MarkWatchedButton } from '../../../showOperations';
// import styles from './EpisodesList.css';

const { TreeNode } = Tree;

const EpisodesList = ({ showId, title, episodes }) => {
  const seasons = groupEpisodes(episodes);
  const seasonNodes = seasons.map(episodes => {
    const { season } = episodes[0];
    const episodeNodes = episodes.map(({
      episodeId,
      episode,
      premiereDate,
      watched,
    }) => (
      <TreeNode
        key={episodeId}
        selectable={false}
        isLeaf
        title={
          <span>
            {episodeLabel(season, episode)}{' '}-{' '}<DateFormat value={premiereDate} />
            <MarkWatchedButton
              showId={showId}
              episodeId={episodeId}
              watched={watched}
              title={`${title} ${episodeLabel(season, episode)}`}
            />
          </span>
        }
      />
    ));

    return (
      <TreeNode
        key={season}
        title={<SeasonLabel season={season} />}
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
