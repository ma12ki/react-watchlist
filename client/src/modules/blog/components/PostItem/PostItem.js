import React from 'react';
import PropTypes from 'prop-types';
import Link from 'redux-first-router-link';

const PostItem = ({ id, title }) => (
  <div>
    <h4><Link to={`/posts/${id}`}>{title}</Link></h4>
  </div>
);

PostItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

export default PostItem;
