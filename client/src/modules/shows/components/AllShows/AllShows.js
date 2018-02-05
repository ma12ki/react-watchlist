import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Link from 'redux-first-router-link';
// import cn from 'classnames';

import { ShowTypeIcon, Table } from '../../../shared';
import { FollowButton, DeleteShowButton, CreateShowButton } from '../../../showOperations';
import { loadingSel, itemsSel, getShowsRequest } from '../../duck';
import styles from './AllShows.css';

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
        render(title, { slug }) {
          return <Link to={`/shows/${slug}`} title="Go to details">{title}</Link>;
        },
      },
      {
        width: '5rem',
        render(_, { showId, title, following }) {
          return (
            <div className={styles.operations}>
              <FollowButton showId={showId} title={title} following={following} />
              <DeleteShowButton showId={showId} title={title} />
            </div>
          );
        },
      },
    ];
  }

  render() {
    const { items, loading } = this.props;

    return (
      <React.Fragment>
        <CreateShowButton />
        <Table
          className={styles.table}
          columns={this.getColumns()}
          dataSource={items}
          loading={loading}
          pagination={{
            pageSize: 15,
            pageSizeOptions: ['15', '30', '50', '100'],
            showSizeChanger: true,
            showTotal: () => `${items.length} total`,
          }}
          rowKey="showId"
          size="middle"
        />
      </React.Fragment>
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
