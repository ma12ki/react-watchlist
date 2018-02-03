import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Modal } from '../../../shared';
import {
  showSel,
  editModalVisibleSel,
  editLoadingSel,
  editShowRequest,
  closeEditShow,
} from '../../duck';
import EditShowForm from './EditShowForm';

const EditShowModal = ({
  visible,
  show,
  loading,
  onEdit,
  onCancel,
}) => {
  const editMode = show.showId != null;
  const title = editMode ? `Edit "${show.title}"` : 'Create new';

  return (
    <Modal
      visible={visible}
      title={title}
      onCancel={onCancel}
      okText="Save"
      destroyOnClose={true}
      footer={null}
    >
      <EditShowForm
        show={show}
        loading={loading}
        onEdit={onEdit}
        onCancel={onCancel}
      />
    </Modal>
  );
};

EditShowModal.propTypes = {
  show: PropTypes.object.isRequired,
  visible: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  onEdit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

const mapState = state => ({
  visible: editModalVisibleSel(state),
  show: showSel(state),
  loading: editLoadingSel(state),
});

const mapDispatch = dispatch => ({
  onEdit: show => dispatch(editShowRequest(show)),
  onCancel: () => dispatch(closeEditShow()),
});

export default connect(mapState, mapDispatch)(EditShowModal);
