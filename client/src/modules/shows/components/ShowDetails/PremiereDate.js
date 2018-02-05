import React from 'react';
import PropTypes from 'prop-types';

import { DateFormat, FlexSpacer } from '../../../shared';
import { MarkWatchedButton, PostponeButton } from '../../../showOperations';
import styles from './PremiereDate.css';

const PremiereDate = ({ showId, title, episode }) => {
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
        <PostponeButton
          showId={showId}
          currentPremiereDate={premiereDate}
          title={title}
        />
      </div>
    </div>
  );
};

PremiereDate.propTypes = {
  showId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  episode: PropTypes.object.isRequired,
};

export default PremiereDate;
