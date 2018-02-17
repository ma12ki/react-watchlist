import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DeleteIcon from 'material-ui-icons/Delete';

import { IconButton, Popconfirm } from '../../../shared';
import { operationLoadingSel, deleteEpisodesRequest } from '../../duck';

class DeleteEpisodesButton extends React.Component {
  state = {
    internalLoading: false,
  }

  componentWillReceiveProps = ({ loading }) => {
    if (!loading) {
      this.setState({ internalLoading: false });
    }
  }

  handleDelete = e => {
    e.stopPropagation();
    this.setState({ internalLoading: true });
    this.props.onDelete();
  }

  render() {
    const { loading, title, disabled, className } = this.props;
    const { internalLoading } = this.state;

    return (
      <Popconfirm
        title={`Are you sure you want to delete ${title}?`}
        okText="Yes"
        cancelText="No"
        onConfirm={this.handleDelete}
      >
        <IconButton
          className={className}
          type="danger"
          title={`Delete "${title}"`}
          loading={internalLoading}
          disabled={(!internalLoading && loading) || disabled}
        >
          <DeleteIcon />
        </IconButton>
      </Popconfirm>
    );
  }
}

DeleteEpisodesButton.propTypes = {
  title: PropTypes.string.isRequired,
  showId: PropTypes.number.isRequired,
  season: PropTypes.number.isRequired,
  episode: PropTypes.number,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
};

const mapState = (state, { showId }) => ({
  loading: operationLoadingSel(state, showId),
});

const mapDispatch = (dispatch, { showId, season, episode, title }) => ({
  onDelete: () => dispatch(deleteEpisodesRequest(showId, season, episode, title)),
});

export default connect(mapState, mapDispatch)(DeleteEpisodesButton);
