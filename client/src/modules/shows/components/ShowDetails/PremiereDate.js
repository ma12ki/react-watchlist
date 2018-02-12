import React from 'react';
import PropTypes from 'prop-types';

import { DateFormat, FlexSpacer } from '../../../shared';
import { MarkWatchedButton, PostponeButton } from '../../../showOperations';
import styles from './PremiereDate.css';

const PremiereDate = ({ showId, title, episode, isAtLeastAdmin }) => {
  const { episodeId, watched, premiereDate } = episode;

  return (
    <div className={styles.container}>
      <div>
        <span className={styles.label}>Premiere date:</span>
        <DateFormat value={premiereDate} fromNowTitle className={watched ? styles.watched : ''} />
      </div>
      <FlexSpacer />
      <div className={styles.actionButtons}>
        <MarkWatchedButton
          showId={showId}
          episodeId={episodeId}
          watched={watched}
          title={title}
        />
        {isAtLeastAdmin && <PostponeButton
          showId={showId}
          currentPremiereDate={premiereDate}
          title={title}
        />}
      </div>
    </div>
  );
};

PremiereDate.propTypes = {
  isAtLeastAdmin: PropTypes.bool.isRequired,
  showId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  episode: PropTypes.object.isRequired,
};

export default PremiereDate;
