import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { themes } from '../../constants';
import { getCurrentTheme } from '../../selectors';
import { setTheme } from '../../actions';
import styles from './ThemePicker.css';

const ThemePicker = ({ currentTheme, setTheme }) => {
  const options = Object.keys(themes)
    .map((theme) => (
        <button
          key={theme}
          className={currentTheme === theme ? styles.active : ''}
          style={{ backgroundColor: themes[theme] }}
          onClick={() => setTheme(theme)}
        />
      )
    );

  return (
    <div className={styles.picker}>
      {options}
    </div>
  );
};

ThemePicker.propTypes = {
  currentTheme: PropTypes.string.isRequired,
  setTheme: PropTypes.func.isRequired,
};

const mapState = (state) => ({
  currentTheme: getCurrentTheme(state),
});

const mapDispatch = (dispatch) => ({
  setTheme: (theme) => dispatch(setTheme(theme)),
});

export default connect(mapState, mapDispatch)(ThemePicker);
