import React from 'react';

import styles from './ThemeShowcase.css';

const groups = ['bg', 'primary', 'secondary', 'tertiary'];
const variants = ['Dark', '', 'Light'];

const ThemeShowcase = () => {
  return groups.map((group, i) => {

    const cols = variants.map((variant) => {
      const texts = groups.map((g) => {
        return variants.map((v) => <p key={g + v} className={styles[`${g}${v}Text`]}>lorem ipsum dolor sit amet</p>);
      });

      return (
        <div key={group + variant} className={styles[`${group}${variant}`]}>
          lorem ipsum dolor sit amet
          {texts}
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
