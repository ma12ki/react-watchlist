import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Link from 'redux-first-router-link';

import { getGrandchild } from '../../selectors';

// const Grandchild = ({ name }) => {
//   return (
//     <div>
//       <h3>I'm the grandchild and my name is {name}</h3>
//       <Link to={`/nested`}>show only the parent</Link>
//       <br />
//       <Link to={`/nested/someChild`}>show child</Link>
//     </div>
//   );
// };

class Grandchild extends React.Component {

  componentDidMount() {
    // eslint-disable-next-line no-console
    console.log('Grandchild mounted');
  }

  render() {
    const { name } = this.props;
    return (
      <div>
        <h3>I'm the grandchild and my name is {name}</h3>
        <Link to={`/nested`}>show only the parent</Link>
        <br />
        <Link to={`/nested/someChild`}>show child</Link>
      </div>
    );
  }
}

Grandchild.propTypes = {
  name: PropTypes.string,
};

const mapStateToProps = (state) => ({
  name: getGrandchild(state),
});

export default connect(mapStateToProps)(Grandchild);
