import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DoneIcon from 'material-ui-icons/Done';
import cn from 'classnames';

import { loadingSel, markWatchedRequest } from '../../duck';
import styles from './MarkWatched.css';

const MarkWatched = ({ watched, loading, onMarkWatched }) => {
  const classNames = cn(
    styles.iconWrapper,
    {
      [styles.watched]: watched,
      [styles.loading]: loading,
    },
  );
  const action = loading ? () => {} : onMarkWatched;
  const title = watched ? 'Marked watched - click to mark not watched' : 'Not watched - click to mark watched';

  return (
    <span
      className={classNames}
      title={title}
      onClick={action}
    >
      <DoneIcon />
    </span>
  );
};

MarkWatched.propTypes = {
  showId: PropTypes.string.isRequired,
  episodeId: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  watched: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  onMarkWatched: PropTypes.func.isRequired,
};

const mapState = (state, { showId }) => ({
  loading: loadingSel(state, showId),
});

const mapDispatch = (dispatch, { showId, episodeId, title }) => ({
  onMarkWatched: () => dispatch(markWatchedRequest(showId, episodeId, title)),
});

export default connect(mapState, mapDispatch)(MarkWatched);
