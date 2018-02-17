import React from 'react';
import PropTypes from 'prop-types';

import { seasonLabel } from '../../utils';

const SeasonLabel = ({ season }) => <span>{seasonLabel(season)}</span>;

SeasonLabel.propTypes = {
  season: PropTypes.number.isRequired,
};

export default SeasonLabel;
