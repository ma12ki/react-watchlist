import React from 'react';
import cn from 'classnames';

import styles from './Home.css';

const Home = () => (
  <div className={styles.outerGrid}>
    <header className={cn(styles.header, styles.borders)}>header (this is IE-compatible grid layout)</header>
    <nav className={cn(styles.nav, styles.borders)}>nav</nav>
    <div className={cn(styles.main, styles.innerGrid, styles.borders)}>
      <aside className={cn(styles.aside, styles.box)}>aside</aside>
      <article className={cn(styles.article1, styles.box)}>article 1</article>
      <article className={cn(styles.article2, styles.box)}>article 2</article>
    </div>
  </div>
);

export default Home;
