import React from 'react';
import PropTypes from 'prop-types';
import { uniq } from 'lodash';
// import cn from 'classnames';

import { episodeLabel } from '../../../utils';
import { DateFormat, SeasonLabel, Tree } from '../../../shared';
import { MarkWatched } from '../../../episodeActions';
import styles from './EpisodesList.css';

const TreeNode = Tree.TreeNode;

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
            <MarkWatched
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
