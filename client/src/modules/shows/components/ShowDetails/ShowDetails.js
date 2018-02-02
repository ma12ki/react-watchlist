import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import cn from 'classnames';

import { Card, H, ShowTypeIcon } from '../../../shared';
import { Follow } from '../../../episodeActions';
import { showLoadingSel, showSel } from '../../duck';
import EpisodesList from './EpisodesList';
import styles from './ShowDetails.css';

class ShowDetails extends React.Component {
  render() {
    const { show, loading } = this.props;

    return (
      <Card loading={loading} className={styles.card}>
        {!loading && <div className={styles.content}>
          <ShowTypeIcon type={show.type} size="xlarge" className={styles.showTypeIcon} />
          <div>
            <div>
              <H size="2" className={styles.title}>{show.title}</H>
              <div className={styles.actions}>
                <Follow showId={show.showId} title={show.title} following={show.following} />
              </div>
            </div>
            <div>
              <EpisodesList showId={show.showId} title={show.title} episodes={show.episodes} />
            </div>
          </div>
        </div> || <div />}
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
