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

const showTypesNames = {
  'movie': 'Movie',
  'show': 'TV Show',
  'anime': 'Anime',
  'comic': 'Comic',
};

const ShowTypeIcon = ({ type, size, className }) => {
  const Icon = showTypesIcons[type];
  const title = showTypesNames[type];
  const wrapperClassNames = cn(
    styles.iconWrapper,
    className,
  );

  return (
    <span title={title} className={wrapperClassNames}>
      <Icon className={styles[size]} />
    </span>
  );
};

ShowTypeIcon.propTypes = {
  type: showTypesPropTypes.isRequired,
  size: PropTypes.oneOf(['small', 'default', 'large', 'xlarge']),
  className: PropTypes.string,
};

ShowTypeIcon.defaultProps = {
  size: 'default',
};

export default ShowTypeIcon;
