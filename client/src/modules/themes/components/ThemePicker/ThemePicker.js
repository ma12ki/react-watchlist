import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CheckIcon from 'material-ui-icons/Check';
import cn from 'classnames';

import { themes } from '../../constants';
import { setTheme, currentThemeSel } from '../../duck';
import styles from './ThemePicker.css';

class ThemePicker extends React.Component {
  constructor(props) {
    super(props);

    this.applyTheme(props.currentTheme);
  }

  handleSetTheme = e => {
    const { name: theme } = e.target;
    this.applyTheme(theme);
    this.props.onSetTheme(theme);
  }

  applyTheme = theme => {
    document.documentElement.setAttribute('theme', theme);
  }

  render() {
    const { currentTheme, className } = this.props;

    const options = Object.keys(themes)
      .map((theme) => (
          <button
            key={theme}
            name={theme}
            className={styles.button}
            style={{ backgroundColor: themes[theme] }}
            onClick={this.handleSetTheme}
          >{currentTheme === theme && <CheckIcon className={styles.icon} />}
          </button>
        )
      );

    return (
      <div className={cn(styles.picker, className)}>
        {options}
      </div>
    );
  }
}

ThemePicker.propTypes = {
  currentTheme: PropTypes.string.isRequired,
  onSetTheme: PropTypes.func.isRequired,
  className: PropTypes.string,
};

const mapState = (state) => ({
  currentTheme: currentThemeSel(state),
});

const mapDispatch = (dispatch) => ({
  onSetTheme: (theme) => dispatch(setTheme(theme)),
});

export default connect(mapState, mapDispatch)(ThemePicker);
