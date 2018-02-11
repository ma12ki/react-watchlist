import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { uniq } from 'lodash';
// import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
// import ChevronRightIcon from 'material-ui-icons/ChevronRight';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';

import { Timeline as BaseTimeline } from '../../../../shared';
import { episodesRequest, setMaxDate, episodesSel, loadingSel, maxDateSel } from '../../duck';
import TimelineCell from './TimelineCell';
// import styles from './Timeline.css';

const { Item } = BaseTimeline;

class Timeline extends React.PureComponent {
  componentDidMount() {
    this.props.onLoadEpisodes();
  }

  handleLoadMore = e => {
    e.preventDefault();
    const { maxDate } = this.props;
    this.props.onSetMaxDate(moment(maxDate).add(7, 'days').toISOString());
  }

  renderNodes = () => {
    const { episodes } = this.props;
    const dates = uniqDates(episodes);

    return dates.map(date => {
      const episodesForDate = getEpisodesForDate(episodes, date);

      return <TimelineCell key={date} cellDate={date} episodes={episodesForDate} />;
    });
  }

  render() {
    const { loading, maxDate } = this.props;
    const timelineNodes = this.renderNodes();

    return (
      <BaseTimeline pending={loading && 'Loading...'}>
        {timelineNodes}
        {!loading && <Item dot={<ExpandMoreIcon />}>
          <a onClick={this.handleLoadMore}>
            Showing data up to {moment(maxDate).format('DD.MM.YYYY')}.
            <br />
            Click to load 7 days more...
          </a>
        </Item>}
      </BaseTimeline>
    );
  }
}

const uniqDates = episodes => uniq(episodes.map(({ premiereDate }) => premiereDate));
const getEpisodesForDate = (episodes, date) => episodes.filter(({ premiereDate }) => premiereDate === date);

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
