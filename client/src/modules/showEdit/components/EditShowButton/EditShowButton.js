import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ModeEditIcon from 'material-ui-icons/ModeEdit';

import { Button } from '../../../shared';
import { openEditShow } from '../../duck';

const EditShowButton = ({ onEdit }) => (
  <Button ghost shape="circle" onClick={onEdit}>
    <ModeEditIcon />
  </Button>
);

EditShowButton.propTypes = {
  show: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
};

const mapDispatch = (dispatch, { show }) => ({
  onEdit: () => dispatch(openEditShow(show)),
});

export default connect(null, mapDispatch)(EditShowButton);
