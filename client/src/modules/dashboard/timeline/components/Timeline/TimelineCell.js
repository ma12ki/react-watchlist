import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { H, Timeline } from '../../../../shared';
import { EpisodesList } from '../../../common';

const { Item } = Timeline;

const TimelineCell = ({ cellDate, episodes }) => {
  const futureCell = moment().isBefore(cellDate);
  const color = futureCell ? 'orange' : 'green';

  return (
    <Item color={color}>
      <H size="4">{moment(cellDate).format('DD.MM.YYYY')}</H>
      <EpisodesList episodes={episodes} />
    </Item>
  );
};

TimelineCell.propTypes = {
  cellDate: PropTypes.string.isRequired,
  episodes: PropTypes.array,
};

export default TimelineCell;
