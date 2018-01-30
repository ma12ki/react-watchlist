import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import cn from 'classnames';

import { Follow } from '../../../episodeActions';
import { loadingSel, itemsSel, getShowsRequest } from '../../duck';
// import styles from './AllShows.css';

class AllShows extends React.Component {
  componentDidMount() {
    this.props.onGetShows();
  }

  render() {
    const { items } = this.props;
    const elements = items.map(s => <div key={s.showId}><Follow showId={s.showId} following={s.following} />{s.title}</div>);

    return (
      <div>
        {elements}
      </div>
    );
  }
}

AllShows.propTypes = {
  loading: PropTypes.bool.isRequired,
  items: PropTypes.array.isRequired,
  onGetShows: PropTypes.func.isRequired,
};

const mapState = (state) => ({
  loading: loadingSel(state),
  items: itemsSel(state),
});

const mapDispatch = (dispatch) => ({
  onGetShows: () => dispatch(getShowsRequest()),
});

export default connect(mapState, mapDispatch)(AllShows);
