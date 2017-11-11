import React from 'react';
import { NavLink } from 'redux-first-router-link';

import styles from './Nav.css';

const activeClassName = 'active';

const Nav = () => {
  return (
    <ul className={styles.list}>
      <li className={styles.item}><NavLink to={'/'} activeClassName={activeClassName} exact>Home</NavLink></li>
      <li className={styles.item}><NavLink to={'/posts'} activeClassName={activeClassName}>Blog (thunks)</NavLink></li>
      <li className={styles.item}><NavLink to={'/nested'} activeClassName={activeClassName}>Nested routes</NavLink></li>
      <li className={styles.item}><a className={styles.extra} href="/something-that-does-not-exist">404</a></li>
    </ul>
  );
};

export default Nav;
