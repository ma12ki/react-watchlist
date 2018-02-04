import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DeleteIcon from 'material-ui-icons/Delete';

import { IconButton, Popconfirm } from '../../../shared';
import { deleteShowRequest } from '../../duck';

const DeleteShowButton = ({ season, episode, loading, onDelete }) => {
  const title = episode != null ? 'Delete episode' : (season != null ? 'Delete season' : 'Delete show');

  return (
    <Popconfirm title="Are you sure?" onConfirm={onDelete}>
      <IconButton type="danger" title={title} loading={loading}>
        <DeleteIcon />
      </IconButton>
    </Popconfirm>
  );
};

DeleteShowButton.propTypes = {
  showId: PropTypes.string.isRequired,
  season: PropTypes.number,
  episode: PropTypes.number,
  loading: PropTypes.bool,
  onDelete: PropTypes.func.isRequired,
};

const mapDispatch = (dispatch, { title, showId, season, episode }) => ({
  onDelete: () => dispatch(deleteShowRequest(title, showId, season, episode)),
});

export default connect(null, mapDispatch)(DeleteShowButton);
