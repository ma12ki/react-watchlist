import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import cn from 'classnames';

import { Card, H, ShowTypeIcon } from '../../../shared';
import { EditShowButton, FollowButton } from '../../../showOperations';
import { showLoadingSel, showSel } from '../../duck';
import EpisodesList from './EpisodesList';
import PremiereDate from './PremiereDate';
import styles from './ShowDetails.css';

class ShowDetails extends React.Component {
  render() {
    const { show, loading } = this.props;
    const { showId, title, type, recurring, following, episodes } = show;

    return (
      <Card loading={loading} className={styles.card}>
        {!loading && <div className={styles.content}>
          <ShowTypeIcon type={type} size="xlarge" className={styles.showTypeIcon} />
          <div>
            <div>
              <H size="2" className={styles.title}>{title}</H>
              <div className={styles.actions}>
                <FollowButton showId={showId} title={title} following={following} />
                <EditShowButton show={show} />
              </div>
            </div>
            <div>
              {recurring ?
                <EpisodesList showId={showId} title={title} episodes={episodes} /> :
                <PremiereDate showId={showId} title={title} episode={episodes[0]} />
              }
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

export default connect(mapState)(ShowDetails);
