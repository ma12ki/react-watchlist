import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Select } from '../../../shared';
import { userLoadingSel, editUserRequest } from '../../duck';
import styles from './RoleSelect.css';

const { Option } = Select;

const RoleSelect = ({ user, currentUserId, loading, onSetRole }) => {
  const { role, userId } = user;
  const isCurrentUser = userId === currentUserId;

  return (
    <Select
      className={styles.select}
      value={role}
      disabled={isCurrentUser || loading}
      onChange={role => onSetRole({ ...user, role })}
    >
      <Option value="root" disabled>Root</Option>
      <Option value="admin">Admin</Option>
      <Option value="user">User</Option>
    </Select>
  );
};

RoleSelect.propTypes = {
  user: PropTypes.object.isRequired,
  currentUserId: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  onSetRole: PropTypes.func.isRequired,
};

const mapState = (state, { user }) => ({
  currentUserId: 'lolmao',
  loading: userLoadingSel(state, user.userId),
});

const mapDispatch = dispatch => ({
  onSetRole: user => dispatch(editUserRequest(user)),
});

export default connect(mapState, mapDispatch)(RoleSelect);
