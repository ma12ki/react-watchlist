
import React from 'react';
import PropTypes from 'prop-types';
import AddIcon from 'material-ui-icons/Add';
import DeleteIcon from 'material-ui-icons/Delete';
import cn from 'classnames';

import { groupEpisodes, uniqSeasons, seasonLabel } from '../../../utils';
import { EpisodeLabel, DateFormat, Tree } from '../../../shared';
import AddEpisodesModal from './AddEpisodesModal';
import styles from './EpisodesInput.css';

const { TreeNode } = Tree;

class EpisodesInput extends React.Component {

  handleAddEpisodes = newEpisodes => {
    this.props.onChange([
      ...(this.props.value || []),
      ...newEpisodes,
    ]);
  }

  handleRemoveSeason = season => {
    this.props.onChange(this.props.value.filter(ep => ep.season !== season));
  }

  handleRemoveEpisode = (season, episode) => {
    this.props.onChange(this.props.value.filter(ep => !(ep.season === season && ep.episode === episode)));
  }

  render() {
    const { value = [] } = this.props;
    const allEpisodes = value;
    const seasonNumbers = uniqSeasons(allEpisodes);
    const seasons = groupEpisodes(allEpisodes);
    const seasonNodes = seasons.map(episodes => {
      const { season } = episodes[0];
      const maxEpisode = episodes[episodes.length - 1].episode;
      const hasRemovableEpisodes = episodes.filter(({ episodeId }) => episodeId == null).length > 0;
      const lastIndex = episodes.length - 1;
      const episodeNodes = episodes.map(({
        episodeId,
        episode,
        premiereDate,
      }, index) => {
        const canRemove = hasRemovableEpisodes && index === lastIndex;
        const isExistingEpisode = episodeId != null;
        return (
          <TreeNode
            key={`${season}${episode}`}
            selectable={false}
            isLeaf
            title={
              <span className={cn({ [styles.existingEpisode]: isExistingEpisode })}>
                <EpisodeLabel season={season} episode={episode} />{' '}-{' '}<DateFormat value={premiereDate} />
                {canRemove && <DeleteIcon className={styles.deleteIcon} onClick={() => this.handleRemoveEpisode(season, episode)} />}
              </span>
            }
          />
        );
      });

      return (
        <TreeNode
          key={season}
          title={
            <span>
              {seasonLabel(season)}
              {hasRemovableEpisodes && <DeleteIcon className={styles.deleteIcon} onClick={() => this.handleRemoveSeason(season)} />}
            </span>
          }
          selectable={false}
        >
          {episodeNodes}
          <TreeNode
            key={`${season}add`}
            selectable={false}
            isLeaf
            title={
              <AddEpisodesModal
                season={season}
                episode={maxEpisode}
                onAdd={this.handleAddEpisodes}
              >
                <AddIcon /> Add more episodes
              </AddEpisodesModal>
            }
          />
        </TreeNode>
      );
    });

    return (
      <Tree defaultExpandAll>
        {seasonNodes}
        <TreeNode
          key={`addNew`}
          selectable={false}
          isLeaf
          title={
            <AddEpisodesModal
              disabledSeasons={seasonNumbers}
              onAdd={this.handleAddEpisodes}
            >
              <AddIcon /> Add season
            </AddEpisodesModal>
          }
        />
      </Tree>
    );
  }
}

EpisodesInput.propTypes = {
  value: PropTypes.array,
  onChange: PropTypes.func,
};

export default EpisodesInput;
