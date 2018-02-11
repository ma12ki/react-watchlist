import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
// import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
// import ChevronRightIcon from 'material-ui-icons/ChevronRight';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';

import { Timeline as BaseTimeline } from '../../../../shared';
import { episodesRequest, setMaxDate, episodesSel, loadingSel, maxDateSel } from '../../duck';
// import TimelineCell from './TimelineCell';
// import styles from './Timeline.css';

const { Item } = BaseTimeline;

class Timeline extends React.Component {
  componentDidMount() {
    this.props.onLoadEpisodes();
  }

  handleLoadMore = e => {
    e.preventDefault();
    const { maxDate } = this.props;
    this.props.onSetMaxDate(moment(maxDate).add(7, 'days').toISOString());
  }

  // renderFullCell = date => {
  //   const { episodes } = this.props;
  //   const episodesForDate = episodes.filter(e => moment(date).isSame(e.premiereDate, 'day'));
  //   const selectedMonth = this.getSelectedMonth();

  //   return (
  //     <TimelineCell
  //       cellDate={date}
  //       selectedMonth={selectedMonth}
  //       episodes={episodesForDate}
  //     />
  //   );
  // }

  render() {
    const { loading } = this.props;

    return (
      <BaseTimeline pending={loading && 'Loading...'}>
        <Item>lol</Item>
        <Item>mao</Item>
        <Item>kakao</Item>
        <Item>roflolmao</Item>
        <Item>xD</Item>
        {!loading && <Item dot={<ExpandMoreIcon />}><a onClick={this.handleLoadMore}>Load 7 days more</a></Item>}
      </BaseTimeline>
    );
  }
}

Timeline.propTypes = {
  episodes: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  maxDate: PropTypes.string.isRequired,
  onLoadEpisodes: PropTypes.func.isRequired,
  onSetMaxDate: PropTypes.func.isRequired,
};

const mapState = state => ({
  episodes: mapEpisodes(episodesSel(state)),
  loading: loadingSel(state),
  maxDate: maxDateSel(state),
});

const mapEpisodes = episodes => episodes.map(e => ({
  ...e,
  prevEpisodesWatched: getPrevEpisodesWatched(episodes, e.showId, e.season, e.episode)
}));

const getPrevEpisodesWatched = (episodes, showId, season, episode) => episodes
  .filter(e => e.showId === showId && ((e.season === season && e.episode < episode) || (e.season < season)))
  .reduce((watched, e) => watched && e.watched, true);

const mapDispatch = dispatch => ({
  onLoadEpisodes: () => dispatch(episodesRequest()),
  onSetMaxDate: maxDate => dispatch(setMaxDate(maxDate))
});

export default connect(mapState, mapDispatch)(Timeline);
