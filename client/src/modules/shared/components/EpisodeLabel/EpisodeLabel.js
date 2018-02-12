import React from 'react';
import PropTypes from 'prop-types';
import padStart from 'lodash/padStart';

import styles from './EpisodeLabel.css';

const EpisodeLabel = ({ season, episode }) => {
  const seasonNumber = padStart(season, 2, '0');
  const episodeNumber = padStart(episode, 2, '0');

  return (
    <span className={styles.label}>
      <span className={styles.char}>S</span>
      <span className={styles.number}>{seasonNumber}</span>
      <span className={styles.char}>E</span>
      <span className={styles.number}>{episodeNumber}</span>
    </span>
  );
};

EpisodeLabel.propTypes = {
  season: PropTypes.number.isRequired,
  episode: PropTypes.number.isRequired,
};

export default EpisodeLabel;
