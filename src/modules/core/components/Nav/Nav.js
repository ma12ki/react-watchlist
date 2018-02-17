import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'redux-first-router-link';
import DashboardIcon from 'material-ui-icons/Dashboard';
import ViewListIcon from 'material-ui-icons/ViewList';
import ColorLensIcon from 'material-ui-icons/ColorLens';
import PeopleIcon from 'material-ui-icons/People';
import ExitToAppIcon from 'material-ui-icons/ExitToApp';
import cn from 'classnames';

import { ThemePicker } from '../../../themes';
import { logout, userSel, isLoggedInSel, isRootSel } from '../../../user';
import styles from './Nav.css';

const activeClassName = styles.active;

class Nav extends React.Component {
  state = {
    themePickerOpen: false,
  }

  toggleThemePicker = () => {
    this.setState(({ themePickerOpen }) => ({
      themePickerOpen: !themePickerOpen,
    }));
  }

  render() {
    const { user, isLoggedIn, isRoot, onLogout } = this.props;
    const { themePickerOpen } = this.state;

    return (
      <ul className={styles.nav}>
        {isLoggedIn && <li className={styles.item}>
          <NavLink to={'/'} exact activeClassName={activeClassName} className={styles.link} title="Dashboard">
            <DashboardIcon className={styles.icon} />
          </NavLink>
        </li>}
        {isLoggedIn && <li className={styles.item}>
          <NavLink to={'/shows'} activeClassName={activeClassName} className={styles.link} title="All">
            <ViewListIcon className={styles.icon} />
          </NavLink>
        </li>}
        <li className={styles.spacer} />
        {isRoot && <li className={styles.item}>
          <NavLink to={'/users'} activeClassName={activeClassName} className={styles.link} title="Users">
            <PeopleIcon className={styles.icon} />
          </NavLink>
        </li>}
        {isLoggedIn && <li className={styles.item}>
          <div className={styles.link} title={`Logout ${user.email}`} onClick={onLogout}>
            <ExitToAppIcon className={styles.icon} />
          </div>
        </li>}
        <li className={cn(styles.item, styles.themePickerItem)} onClick={this.toggleThemePicker}>
          <ThemePicker className={cn(styles.themePicker, { [styles.open]: themePickerOpen })} />
          <div className={cn(styles.link, styles.themePickerLink)} title="Theme">
            <ColorLensIcon className={styles.icon} />
          </div>
        </li>
      </ul>
    );
  }
}

Nav.propTypes = {
  user: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  isRoot: PropTypes.bool.isRequired,
  onLogout: PropTypes.func.isRequired,
};

const mapState = state => ({
  user: userSel(state),
  isLoggedIn: isLoggedInSel(state),
  isRoot: isRootSel(state),
});

const mapDispatch = dispatch => ({
  onLogout: () => dispatch(logout()),
});

export default connect(mapState, mapDispatch)(Nav);
