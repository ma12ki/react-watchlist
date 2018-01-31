import React from 'react';
import { NavLink } from 'redux-first-router-link';
import DashboardIcon from 'material-ui-icons/Dashboard';
import ViewListIcon from 'material-ui-icons/ViewList';
import ColorLensIcon from 'material-ui-icons/ColorLens';
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
          <NavLink to={'/'} exact activeClassName={activeClassName} className={styles.link} title="Dashboard">
            <DashboardIcon className={styles.icon} />
          </NavLink>
        </li>
        <li className={styles.item}>
          <NavLink to={'/shows'} activeClassName={activeClassName} className={styles.link} title="All">
            <ViewListIcon className={styles.icon} />
          </NavLink>
        </li>
        <li className={styles.spacer} />
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
