import PropTypes from 'prop-types';

export const showTypes = [ 'movie', 'show', 'anime', 'comic' ];
export const showTypesPropTypes = PropTypes.oneOf(showTypes);
