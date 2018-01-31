import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import DeveloperBoardIcon from 'material-ui-icons/DeveloperBoard';
import LocalMoviesIcon from 'material-ui-icons/LocalMovies';
import TranslateIcon from 'material-ui-icons/Translate';
import TvIcon from 'material-ui-icons/Tv';

import { showTypesPropTypes } from '../../constants';
import styles from './ShowTypeIcon.css';

const showTypesIcons = {
  'movie': LocalMoviesIcon,
  'show': TvIcon,
  'anime': TranslateIcon,
  'comic': DeveloperBoardIcon,
};

const ShowTypeIcon = ({ type, size, className }) => {
  const Icon = showTypesIcons[type];
  const classNames = cn(
    styles.icon,
    styles[size],
    className,
  );

  return <Icon className={classNames} />;
};

ShowTypeIcon.propTypes = {
  type: showTypesPropTypes.isRequired,
  size: PropTypes.oneOf(['small', 'default', 'large']),
  className: PropTypes.string,
};

ShowTypeIcon.defaultProps = {
  size: 'default',
};

export default ShowTypeIcon;
