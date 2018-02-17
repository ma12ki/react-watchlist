import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DeleteIcon from 'material-ui-icons/Delete';

import { IconButton, Popconfirm } from '../../../shared';
import { userLoadingSel, deleteUserRequest } from '../../duck';

const DeleteUserButton = ({ loading, disabled, onDelete }) => (
  <Popconfirm
    title={`Are you sure?`}
    okText="Yes"
    cancelText="No"
    onConfirm={onDelete}
  >
    <IconButton
      type="danger"
      title="Delete"
      loading={loading}
      disabled={disabled || loading}
    >
      <DeleteIcon />
    </IconButton>
  </Popconfirm>
);

DeleteUserButton.propTypes = {
  userId: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
  onDelete: PropTypes.func.isRequired,
};

const mapState = (state, { email }) => ({
  loading: userLoadingSel(state, email),
});

const mapDispatch = (dispatch, { userId, email }) => ({
  onDelete: () => dispatch(deleteUserRequest(userId, email)),
});

export default connect(mapState, mapDispatch)(DeleteUserButton);
