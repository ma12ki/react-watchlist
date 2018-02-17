import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AddIcon from 'material-ui-icons/Add';

import { Button } from '../../../shared';
import { openEditShow } from '../../duck';

const CreateShowButton = ({ onCreate }) => (
  <Button ghost onClick={onCreate} title="Add new">
    <AddIcon /> Add new
  </Button>
);

CreateShowButton.propTypes = {
  onCreate: PropTypes.func.isRequired,
};

const mapDispatch = dispatch => ({
  onCreate: () => dispatch(openEditShow()),
});

export default connect(null, mapDispatch)(CreateShowButton);
