import React from 'react';

import styles from './ThemeShowcase.css';

const groups = ['bg', 'primary', 'bg', 'secondary', 'bg', 'tertiary'];
const variants = ['Dark', '', 'Light'];

const ThemeShowcase = () => {
  return groups.map((group, i) => {

    const cols = variants.map((variant) => {
      // const texts = variants.map((variant) => <p key={variant} className={`${group}${variant}Text`}>text</p>);
      // const containers =
      return (
        <div key={group + variant} className={styles[`${group}${variant}`]}>
          <p className={styles[`${group}Text`]}>text</p>
        </div>
      );
    });

    return (
      <div key={group + i} className={styles.row}>
        {cols}
      </div>
    );
  });
};

export default ThemeShowcase;
