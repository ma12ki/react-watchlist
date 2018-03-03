/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import Transition from 'react-transition-group/Transition';

import styles from './SlideInOutTransition.css';

const SlideInOutTransition = ({ children, position, ...props }) => (
  <Transition
    {...props}
    timeout={3000}
    onEnter={node => node.classList.add(styles.slideIn, styles.animate)}
    onExit={node => {
      node.classList.remove(styles.slideIn, styles.animate);
      node.classList.add(styles.slideOut, styles.animate);
    }}
  >
    {children}
  </Transition>
);

export default SlideInOutTransition;
