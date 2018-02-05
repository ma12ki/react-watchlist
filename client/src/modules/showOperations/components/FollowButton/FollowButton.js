import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import StarIcon from 'material-ui-icons/Star';
import cn from 'classnames';

import { IconButton } from '../../../shared';
import { operationLoadingSel, followRequest, unfollowRequest } from '../../duck';
import styles from './FollowButton.css';

class FollowButton extends React.Component {
  state = {
    internalLoading: false,
  }

  componentWillReceiveProps = ({ loading }) => {
    if (!loading) {
      this.setState({ internalLoading: false });
    }
  }

  handleToggleFollow = e => {
    e.stopPropagation();
    const { following, onFollow, onUnfollow } = this.props;
    this.setState({ internalLoading: true });
    following ? onUnfollow() : onFollow();
  }

  render() {
    const { following, loading } = this.props;
    const { internalLoading } = this.state;
    const classNames = cn({ [styles.following]: following });
    const title = following ? 'Following - click to unfollow' : 'Not following - click to follow';

    return (
      <IconButton
        className={classNames}
        title={title}
        loading={internalLoading}
        disabled={!internalLoading && loading}
        onClick={this.handleToggleFollow}
      >
        <StarIcon />
      </IconButton>
    );
  }
}

FollowButton.propTypes = {
  title: PropTypes.string.isRequired,
  showId: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  following: PropTypes.bool.isRequired,
  onFollow: PropTypes.func.isRequired,
  onUnfollow: PropTypes.func.isRequired,
};

const mapState = (state, { showId }) => ({
  loading: operationLoadingSel(state, showId),
});

const mapDispatch = (dispatch, { showId, title }) => ({
  onFollow: () => dispatch(followRequest(showId, title)),
  onUnfollow: () => dispatch(unfollowRequest(showId, title)),
});

export default connect(mapState, mapDispatch)(FollowButton);
