import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DoneIcon from 'material-ui-icons/Done';
import cn from 'classnames';

import { IconButton } from '../../../shared';
import { operationLoadingSel, markWatchedRequest } from '../../duck';
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

  handleMarkWatched = e => {
    e.stopPropagation();
    this.setState({ internalLoading: true });
    this.props.onMarkWatched();
  }

  render() {
    const { loading, watched } = this.props;
    const { internalLoading } = this.state;

    const classNames = cn({ [styles.watched]: watched });
    const action = loading ? () => {} : this.handleMarkWatched;
    const title = watched ? 'Marked watched - click to mark not watched' : 'Not watched - click to mark watched';

    return (
      <IconButton
        className={classNames}
        title={title}
        loading={internalLoading}
        disabled={!internalLoading && loading}
        onClick={action}
      >
        <DoneIcon />
      </IconButton>
    );
  }
}

MarkWatchedButton.propTypes = {
  title: PropTypes.string.isRequired,
  showId: PropTypes.string.isRequired,
  episodeId: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  watched: PropTypes.bool.isRequired,
  onMarkWatched: PropTypes.func.isRequired,
};

const mapState = (state, { showId }) => ({
  loading: operationLoadingSel(state, showId),
});

const mapDispatch = (dispatch, { showId, episodeId, title }) => ({
  onMarkWatched: () => dispatch(markWatchedRequest(showId, episodeId, title)),
});

export default connect(mapState, mapDispatch)(MarkWatchedButton);
