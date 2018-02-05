import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UpdateIcon from 'material-ui-icons/Update';

import { IconButton } from '../../../shared';
import { openPostponeEpisodes } from '../../duck';

const PostponeButton = ({ onPostpone }) => (
  <IconButton onClick={onPostpone} title="Postpone">
    <UpdateIcon />
  </IconButton>
);

PostponeButton.propTypes = {
  title: PropTypes.string.isRequired,
  showId: PropTypes.string.isRequired,
  season: PropTypes.number.isRequired,
  episode: PropTypes.number.isRequired,
  currentPremiereDate: PropTypes.string.isRequired,
  onPostpone: PropTypes.func.isRequired,
};

const mapDispatch = (dispatch, { showId, season, episode, currentPremiereDate, title }) => ({
  onPostpone: e => {
    e.stopPropagation();
    dispatch(openPostponeEpisodes(showId, season, episode, currentPremiereDate, title));
  },
});

export default connect(null, mapDispatch)(PostponeButton);
