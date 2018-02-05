import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import StarIcon from 'material-ui-icons/Star';
import cn from 'classnames';

import { IconButton } from '../../../shared';
import { operationLoadingSel, followRequest } from '../../duck';
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

  handleFollow = e => {
    e.stopPropagation();
    this.setState({ internalLoading: true });
    this.props.onFollow();
  }

  render() {
    const { following, loading } = this.props;
    const { internalLoading } = this.state;
    const classNames = cn({ [styles.following]: following });
    const action = loading ? () => {} : this.handleFollow;
    const title = following ? 'Following - click to unfollow' : 'Not following - click to follow';

    return (
      <IconButton
        className={classNames}
        title={title}
        loading={internalLoading}
        disabled={!internalLoading && loading}
        onClick={action}
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
};

const mapState = (state, { showId }) => ({
  loading: operationLoadingSel(state, showId),
});

const mapDispatch = (dispatch, { showId, title }) => ({
  onFollow: () => dispatch(followRequest(showId, title)),
});

export default connect(mapState, mapDispatch)(FollowButton);
