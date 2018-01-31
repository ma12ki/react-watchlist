import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import cn from 'classnames';

// import { Follow } from '../../../episodeActions';
import { showLoadingSel, showSel } from '../../duck';
// import styles from './ShowDetails.css';

class ShowDetails extends React.Component {
  render() {
    const { show } = this.props;

    return (
      <div>
        {show.title}
      </div>
    );
  }
}

ShowDetails.propTypes = {
  loading: PropTypes.bool.isRequired,
  show: PropTypes.object.isRequired,
};

const mapState = (state) => ({
  loading: showLoadingSel(state),
  show: showSel(state),
});

// const mapDispatch = (dispatch) => ({
//   onGetShows: () => dispatch(getShowsRequest()),
// });

export default connect(mapState)(ShowDetails);
