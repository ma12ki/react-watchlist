import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DoneIcon from 'material-ui-icons/Done';
import cn from 'classnames';

import { loadingSel, markWatchedRequest } from '../../duck';
import styles from './MarkWatched.css';

const MarkWatched = ({ watched, loading, onMarkWatched }) => {
  const classNames = cn(
    styles.icon,
    {
      [styles.watched]: watched,
      [styles.loading]: loading,
    },
  );

  return (
    <DoneIcon
      onClick={loading ? () => {} : onMarkWatched}
      className={classNames}
    />
  );
};

MarkWatched.propTypes = {
  showId: PropTypes.string.isRequired,
  episodeId: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  watched: PropTypes.bool.isRequired,
  onMarkWatched: PropTypes.func.isRequired,
};

const mapState = (state, { showId }) => ({
  loading: loadingSel(state, showId),
});

const mapDispatch = (dispatch, { showId, episodeId }) => ({
  onMarkWatched: () => dispatch(markWatchedRequest(showId, episodeId)),
});

export default connect(mapState, mapDispatch)(MarkWatched);
