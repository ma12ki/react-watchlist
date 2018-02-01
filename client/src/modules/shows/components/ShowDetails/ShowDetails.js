import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import cn from 'classnames';

import { Card, H, ShowTypeIcon } from '../../../shared';
import { Follow } from '../../../episodeActions';
import { showLoadingSel, showSel } from '../../duck';
import styles from './ShowDetails.css';

class ShowDetails extends React.Component {
  render() {
    const { show, loading } = this.props;

    return (
      <Card loading={loading} className={styles.card}>
        {!loading && <React.Fragment>
          <div className={styles.header}>
            <ShowTypeIcon type={show.type} size="xlarge" className={styles.showTypeIcon} />
            <H size="2" className={styles.title}>{show.title}</H>
            <div className={styles.actions}>
              <Follow showId={show.showId} following={show.following} />
            </div>
          </div>
        </React.Fragment> || <div />}
      </Card>
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
