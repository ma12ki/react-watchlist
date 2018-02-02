import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Link from 'redux-first-router-link';
// import cn from 'classnames';

import { ShowTypeIcon, Table } from '../../../shared';
import { Follow } from '../../../episodeActions';
import { loadingSel, itemsSel, getShowsRequest } from '../../duck';
// import styles from './AllShows.css';

class AllShows extends React.Component {
  componentDidMount() {
    this.props.onGetShows();
  }

  getColumns = () => {
    return [
      {
        dataIndex: 'type',
        width: '5rem',
        render(type) {
          return <ShowTypeIcon type={type} />;
        },
      },
      {
        title: 'Title',
        dataIndex: 'title',
        render(title, { showId }) {
          return <Link to={`/shows/${showId}`} title="Go to details">{title}</Link>;
        },
      },
      {
        width: '5rem',
        render(_, { showId, title, following }) {
          return <Follow showId={showId} title={title} following={following} />;
        },
      },
    ];
  }

  render() {
    const { items, loading } = this.props;

    return (
      <Table
        columns={this.getColumns()}
        dataSource={items}
        loading={loading}
        pagination={false}
        rowKey="showId"
        size="middle"
      />
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
