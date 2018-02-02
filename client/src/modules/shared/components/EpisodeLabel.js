import React from 'react';
import PropTypes from 'prop-types';

import { episodeLabel } from '../../utils';

const EpisodeLabel = ({ season, episode }) => <span>{episodeLabel(season, episode)}</span>;

EpisodeLabel.propTypes = {
  season: PropTypes.number.isRequired,
  episode: PropTypes.number.isRequired,
};

export default EpisodeLabel;
