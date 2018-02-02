import React from 'react';
import PropTypes from 'prop-types';
import { uniq } from 'lodash';
// import cn from 'classnames';

import { Tree } from '../../../shared';
import { MarkWatched } from '../../../episodeActions';
import styles from './EpisodesList.css';

const TreeNode = Tree.TreeNode;

const EpisodesList = ({ showId, title, episodes }) => {
  const seasons = groupEpisodes(episodes);
  const seasonNodes = seasons.map(season => {
    const episodeNodes = season.map(episode => (
      <TreeNode
        key={episode.episodeId}
        selectable={false}
        isLeaf
        title={
          <span>
            S{episode.season}E{episode.episode}
            <MarkWatched
              showId={showId}
              episodeId={episode.episodeId}
              watched={episode.watched}
              title={`${title} S${episode.season}E${episode.episode}`}
            />
          </span>
        }
      />
    ));

    return (
      <TreeNode
        key={season[0].season}
        title={`S${season[0].season}`}
        selectable={false}
      >
        {episodeNodes}
      </TreeNode>
    );
  });

  return (
    <Tree
      defaultExpandAll
    >
      {seasonNodes}
    </Tree>
  );
};

const groupEpisodes = episodes => {
  const seasons = uniq(episodes.map(e => e.season)).sort((a, b) => a - b);
  return seasons.map(season => episodes.filter(e => e.season === season).sort((a, b) => a.episode - b.episode));
};

EpisodesList.propTypes = {
  showId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  episodes: PropTypes.array.isRequired,
};

export default EpisodesList;
