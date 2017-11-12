import React from 'react';

import styles from './ThemeShowcase.css';

const groups = ['bg', 'primary', 'bg', 'secondary', 'bg', 'tertiary'];
const variants = ['Lowest', 'Lower', '', 'Higher', 'Highest'];

const ThemeShowcase = () => {
  return groups.map((group) => {

    const cols = variants.map((variant) => {
      // const texts = variants.map((variant) => <p key={variant} className={`${group}${variant}Text`}>text</p>);
      // const containers =
      return (
        <div key={group + variant} className={styles[`${group}${variant}`]}>
          <p className={styles.text}>text</p>
        </div>
      );
    });

    return (
      <div key={group} className={styles.row}>
        {cols}
      </div>
    );
  });
};

export default ThemeShowcase;
