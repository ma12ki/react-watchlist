import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DeleteIcon from 'material-ui-icons/Delete';

import { IconButton, Popconfirm } from '../../../shared';
import { operationLoadingSel, deleteShowRequest } from '../../duck';

const DeleteShowButton = ({ loading, onDelete }) => (
  <Popconfirm title="Are you sure?" okText="Yes" cancelText="No" onConfirm={onDelete}>
    <IconButton type="danger" title="Delete" loading={loading}>
      <DeleteIcon />
    </IconButton>
  </Popconfirm>
);

DeleteShowButton.propTypes = {
  showId: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  onDelete: PropTypes.func.isRequired,
};

const mapState = (state, { showId }) => ({
  loading: operationLoadingSel(state, showId),
});

const mapDispatch = (dispatch, { showId, title}) => ({
  onDelete: () => dispatch(deleteShowRequest(showId, title)),
});

export default connect(mapState, mapDispatch)(DeleteShowButton);
