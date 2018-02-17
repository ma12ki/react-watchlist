import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DateRangeIcon from 'material-ui-icons/DateRange';
import LinearScaleIcon from 'material-ui-icons/LinearScale';

import { Radio } from '../../../shared';
import { preferredViewSel, setView } from '../../duck';
import styles from './ViewSelector.css';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const ViewSelector = ({ view, onSetView }) => {
  return (
    <RadioGroup className={styles.radioGroup} value={view} onChange={onSetView}>
      <RadioButton value="calendar">
        <div title="Calendar View" className={styles.iconWrapper}>
          <DateRangeIcon />
        </div>
      </RadioButton>
      <RadioButton value="timeline">
        <div title="Timeline View" className={styles.iconWrapper}>
          <LinearScaleIcon className={styles.timelineIcon} />
        </div>
      </RadioButton>
    </RadioGroup>
  );
};

ViewSelector.propTypes = {
  view: PropTypes.string.isRequired,
  onSetView: PropTypes.func.isRequired,
};

const mapState = state => ({
  view: preferredViewSel(state),
});

const mapDispatch = dispatch => ({
  onSetView: e => dispatch(setView(e.target.value)),
});

export default connect(mapState, mapDispatch)(ViewSelector);
