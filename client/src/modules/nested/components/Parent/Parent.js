import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Link from 'redux-first-router-link';

import { getShowChild } from '../../selectors';
import Child from '../Child';

// const Parent = ({ showChild }) => {
//   return (
//     <div>
//       <h1>I'm the parent</h1>
//       <Link to={`/nested/someChild`}>show child</Link>
//       <br />
//       <Link to={`/nested/someChild/someGrandchild`}>show child and grandchild</Link>
//       {showChild && <Child />}
//     </div>
//   );
// };

// componentDidMount just to verify that the parent does not get mounted again
// when navigating through children
class Parent extends React.Component {

  componentDidMount() {
    // eslint-disable-next-line no-console
    console.log('Parent mounted');
  }

  render() {
    const { showChild } = this.props;
    return (
      <div>
        <h1>I'm the parent</h1>
        <Link to={`/nested/someChild`}>show child</Link>
        <br />
        <Link to={`/nested/someChild/someGrandchild`}>show child and grandchild</Link>
        {showChild && <Child />}
      </div>
    );
  }
}

Parent.propTypes = {
  showChild: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  showChild: getShowChild(state),
});

export default connect(mapStateToProps)(Parent);
