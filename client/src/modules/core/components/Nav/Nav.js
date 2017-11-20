import React from 'react';
import { NavLink } from 'redux-first-router-link';
import DashboardIcon from 'material-ui-icons/Dashboard';
import PlaylistAddCheckIcon from 'material-ui-icons/PlaylistAddCheck';
import ListIcon from 'material-ui-icons/List';
import ColorLensIcon from 'material-ui-icons/ColorLens';
import PersonIcon from 'material-ui-icons/Person';
import PeopleIcon from 'material-ui-icons/People';
import cn from 'classnames';

import { ThemePicker } from '../../../themes/components';
import styles from './Nav.css';

const activeClassName = styles.active;

class Nav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      themePickerOpen: false,
    };

    this.toggleThemePicker = this.toggleThemePicker.bind(this);
  }

  toggleThemePicker() {
    this.setState({
      themePickerOpen: !this.state.themePickerOpen,
    });
  }

  render() {
    const { themePickerOpen } = this.state;
    return (
      <ul className={styles.nav}>
        <li className={styles.item}>
          <NavLink to={'/'} activeClassName={activeClassName} className={styles.link} title="Dashboard">
            <DashboardIcon className={styles.icon} />
          </NavLink>
        </li>
        <li className={styles.item}>
          <NavLink to={'/mao'} activeClassName={activeClassName} className={styles.link} title="My list">
            <PlaylistAddCheckIcon className={styles.icon} />
          </NavLink>
        </li>
        <li className={styles.item}>
          <NavLink to={'/mao'} activeClassName={activeClassName} className={styles.link} title="All">
            <ListIcon className={styles.icon} />
          </NavLink>
        </li>
        <li className={styles.spacer} />
        <li className={styles.item}>
          <NavLink to={'/mao'} activeClassName={activeClassName} className={styles.link} title="Profile">
            <PersonIcon className={styles.icon} />
          </NavLink>
        </li>
        <li className={styles.item}>
          <NavLink to={'/mao'} activeClassName={activeClassName} className={styles.link} title="Users">
            <PeopleIcon className={styles.icon} />
          </NavLink>
        </li>
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

export default Nav;
