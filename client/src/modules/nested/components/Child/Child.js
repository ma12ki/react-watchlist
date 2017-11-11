import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Link from 'redux-first-router-link';

import { getShowGrandchild, getChild } from '../../selectors';
import Grandchild from '../Grandchild';

const Child = ({ showGrandchild, name }) => {
  return (
    <div>
      <h2>I'm the child and my name is {name}</h2>
      <Link to={`/nested`}>show only the parent</Link>
      <br />
      <Link to={`/nested/someChild/someGrandchild`}>show child and grandchild</Link>
      {showGrandchild && <Grandchild />}
    </div>
  );
};

Child.propTypes = {
  showGrandchild: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  showGrandchild: getShowGrandchild(state),
  name: getChild(state),
});

export default connect(mapStateToProps)(Child);
