import React from 'react';
import { NavLink } from 'redux-first-router-link';
import DashboardIcon from 'material-ui-icons/Dashboard';
import PlaylistAddCheckIcon from 'material-ui-icons/PlaylistAddCheck';
import ListIcon from 'material-ui-icons/List';
import ColorLensIcon from 'material-ui-icons/ColorLens';
import PersonIcon from 'material-ui-icons/Person';
import PeopleIcon from 'material-ui-icons/People';

import styles from './Nav.css';

const activeClassName = styles.active;

const Nav = () => {
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
      <li className={styles.item}>
        <NavLink to={'/mao'} activeClassName={activeClassName} className={styles.link} title="Theme">
          <ColorLensIcon className={styles.icon} />
        </NavLink>
      </li>
    </ul>
  );
};

export default Nav;
