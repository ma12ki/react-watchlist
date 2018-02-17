import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DoneAllIcon from 'material-ui-icons/DoneAll';
import cn from 'classnames';

import { seasonLabel } from '../../../utils';
import { IconButton } from '../../../shared';
import { operationLoadingSel, markWatchedBulkRequest, unmarkWatchedBulkRequest } from '../../duck';
import styles from './MarkWatchedBulkButton.css';

class MarkWatchedBulkButton extends React.Component {
  state = {
    internalLoading: false,
  }

  componentWillReceiveProps = ({ loading }) => {
    if (!loading) {
      this.setState({ internalLoading: false });
    }
  }

  handleToggleWatched = e => {
    e.stopPropagation();
    const { watched, onMarkWatched, onUnmarkWatched } = this.props;
    this.setState({ internalLoading: true });
    watched ? onUnmarkWatched() : onMarkWatched() ;
  }

  render() {
    const { loading, watched, season, episode } = this.props;
    const { internalLoading } = this.state;

    const classNames = cn({ [styles.watched]: watched });
    const title = getTitle(watched, season, episode);

    return (
      <IconButton
        className={classNames}
        title={title}
        loading={internalLoading}
        disabled={!internalLoading && loading}
        onClick={this.handleToggleWatched}
      >
        <DoneAllIcon />
      </IconButton>
    );
  }
}

const getTitle = (watched, season, episode) => {
  if (season && episode) {
    const seasonEpDesc = `${seasonLabel(season)} through episode ${episode}`;
    return watched ? `${seasonEpDesc} watched - click to mark not watched` : `${seasonEpDesc} not watched - click to mark watched`;
  }
  const seasonDesc = `${seasonLabel(season)}`;
  return watched ? `${seasonDesc} watched - click to mark not watched` : `${seasonDesc} not watched - click to mark watched`;
};

MarkWatchedBulkButton.propTypes = {
  title: PropTypes.string.isRequired,
  showId: PropTypes.number.isRequired,
  season: PropTypes.number.isRequired,
  episode: PropTypes.number,
  loading: PropTypes.bool.isRequired,
  watched: PropTypes.bool,
  onMarkWatched: PropTypes.func.isRequired,
  onUnmarkWatched: PropTypes.func.isRequired,
};

const mapState = (state, { showId }) => ({
  loading: operationLoadingSel(state, showId),
});

const mapDispatch = (dispatch, { showId, season, episode, title }) => ({
  onMarkWatched: () => dispatch(markWatchedBulkRequest(showId, season, episode, title)),
  onUnmarkWatched: () => dispatch(unmarkWatchedBulkRequest(showId, season, episode, title)),
});

export default connect(mapState, mapDispatch)(MarkWatchedBulkButton);
