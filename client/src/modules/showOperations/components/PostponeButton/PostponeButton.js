import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UpdateIcon from 'material-ui-icons/Update';

import { IconButton } from '../../../shared';
import { openPostponeEpisodes } from '../../duck';

const PostponeButton = ({ disabled, title, className, onPostpone }) => (
  <IconButton
    className={className}
    title={`Postpone ${title}`}
    disabled={disabled}
    onClick={onPostpone}
  >
    <UpdateIcon />
  </IconButton>
);

PostponeButton.propTypes = {
  title: PropTypes.string.isRequired,
  showId: PropTypes.number.isRequired,
  season: PropTypes.number,
  episode: PropTypes.number,
  currentPremiereDate: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  onPostpone: PropTypes.func.isRequired,
};

PostponeButton.defaultProps = {
  season: 0,
  episode: 0,
};

const mapDispatch = (dispatch, { showId, season, episode, currentPremiereDate, title }) => ({
  onPostpone: e => {
    e.stopPropagation();
    dispatch(openPostponeEpisodes(showId, season, episode, currentPremiereDate, title));
  },
});

export default connect(null, mapDispatch)(PostponeButton);
