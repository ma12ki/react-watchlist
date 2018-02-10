import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DoneIcon from 'material-ui-icons/Done';
import cn from 'classnames';

import { IconButton } from '../../../shared';
import { operationLoadingSel, markWatchedRequest, unmarkWatchedRequest } from '../../duck';
import styles from './MarkWatchedButton.css';

class MarkWatchedButton extends React.Component {
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
    const { loading, watched } = this.props;
    const { internalLoading } = this.state;

    const classNames = cn({ [styles.watched]: watched });
    const title = watched ? 'Marked watched - click to mark not watched' : 'Not watched - click to mark watched';

    return (
      <IconButton
        className={classNames}
        title={title}
        loading={internalLoading}
        disabled={!internalLoading && loading}
        onClick={this.handleToggleWatched}
      >
        <DoneIcon />
      </IconButton>
    );
  }
}

MarkWatchedButton.propTypes = {
  title: PropTypes.string.isRequired,
  showId: PropTypes.number.isRequired,
  episodeId: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  watched: PropTypes.bool.isRequired,
  onMarkWatched: PropTypes.func.isRequired,
  onUnmarkWatched: PropTypes.func.isRequired,
};

const mapState = (state, { showId }) => ({
  loading: operationLoadingSel(state, showId),
});

const mapDispatch = (dispatch, { showId, episodeId, title }) => ({
  onMarkWatched: () => dispatch(markWatchedRequest(showId, episodeId, title)),
  onUnmarkWatched: () => dispatch(unmarkWatchedRequest(showId, episodeId, title)),
});

export default connect(mapState, mapDispatch)(MarkWatchedButton);
