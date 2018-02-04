import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DoneIcon from 'material-ui-icons/Done';
import cn from 'classnames';

import { IconButton } from '../../../shared';
import { operationLoadingSel, markWatchedRequest } from '../../duck';
import styles from './MarkWatchedButton.css';

const MarkWatchedButton = ({ watched, loading, onMarkWatched }) => {
  const classNames = cn(
    { [styles.watched]: watched },
  );
  const action = loading ? () => {} : onMarkWatched;
  const title = watched ? 'Marked watched - click to mark not watched' : 'Not watched - click to mark watched';

  return (
    <IconButton
      className={classNames}
      title={title}
      loading={loading}
      onClick={action}
    >
      <DoneIcon />
    </IconButton>
  );
};

MarkWatchedButton.propTypes = {
  showId: PropTypes.string.isRequired,
  episodeId: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  watched: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  onMarkWatched: PropTypes.func.isRequired,
};

const mapState = (state, { showId }) => ({
  loading: operationLoadingSel(state, showId),
});

const mapDispatch = (dispatch, { showId, episodeId, title }) => ({
  onMarkWatched: () => dispatch(markWatchedRequest(showId, episodeId, title)),
});

export default connect(mapState, mapDispatch)(MarkWatchedButton);
