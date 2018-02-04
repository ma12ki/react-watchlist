import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import StarIcon from 'material-ui-icons/Star';
import cn from 'classnames';

import { IconButton } from '../../../shared';
import { loadingSel, followRequest } from '../../duck';
import styles from './Follow.css';

const Follow = ({ following, loading, onFollow }) => {
  const classNames = cn(
    styles.iconWrapper,
    {
      [styles.following]: following,
      [styles.loading]: loading,
    },
  );
  const action = loading ? () => {} : onFollow;
  const title = following ? 'Following - click to unfollow' : 'Not following - click to follow';

  return (
    <IconButton
      className={classNames}
      title={title}
      loading={loading}
      onClick={action}
    >
      <StarIcon />
    </IconButton>
  );
};

Follow.propTypes = {
  showId: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  following: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  onFollow: PropTypes.func.isRequired,
};

const mapState = (state, { showId }) => ({
  loading: loadingSel(state, showId),
});

const mapDispatch = (dispatch, { showId, title }) => ({
  onFollow: () => dispatch(followRequest(showId, title)),
});

export default connect(mapState, mapDispatch)(Follow);
