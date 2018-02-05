import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UpdateIcon from 'material-ui-icons/Update';

import { IconButton } from '../../../shared';
import { openPostponeEpisodes } from '../../duck';

const PostponeButton = ({ onPostpone, disabled, className }) => (
  <IconButton
    className={className}
    title="Postpone"
    disabled={disabled}
    onClick={onPostpone}
  >
    <UpdateIcon />
  </IconButton>
);

PostponeButton.propTypes = {
  title: PropTypes.string.isRequired,
  showId: PropTypes.string.isRequired,
  season: PropTypes.number.isRequired,
  episode: PropTypes.number.isRequired,
  currentPremiereDate: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  onPostpone: PropTypes.func.isRequired,
};

const mapDispatch = (dispatch, { showId, season, episode, currentPremiereDate, title }) => ({
  onPostpone: e => {
    e.stopPropagation();
    dispatch(openPostponeEpisodes(showId, season, episode, currentPremiereDate, title));
  },
});

export default connect(null, mapDispatch)(PostponeButton);
