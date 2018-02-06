import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Link from 'redux-first-router-link';
// import cn from 'classnames';

import { Aka, ShowTypeIcon, Table, TableHeadingSort } from '../../../shared';
import { tableSorters, tableSortOrder } from '../../../utils';
import { FollowButton, DeleteShowButton } from '../../../showOperations';
import { allShowsSel, setAllShowsFilters, setAllShowsTableNav, getShowsRequest } from '../../duck';
import SearchBar from './SearchBar';
import styles from './AllShows.css';

const defaultPagination = {
  pageSize: 15,
  pageSizeOptions: ['15', '30', '50', '100'],
  showSizeChanger: true,
};

class AllShows extends React.Component {
  state = {
    filteredItems: [],
  }

  componentDidMount() {
    this.props.onGetShows();
  }

  componentWillReceiveProps = ({ allShows }) => {
    const { items: nextItems, filters: nextFilters } = allShows;
    const { items, filters } = this.props.allShows;

    if (items !== nextItems || filters !== nextFilters) {
      this.updateFilteredItems(nextItems, nextFilters);
    }
  }

  updateFilteredItems = (items, filters) => {
    const { title, types, following } = filters;
    const filteredItems = items.filter(show =>
      (show.title.toLowerCase().includes(title.toLowerCase()) || (show.aka || '').toLowerCase().includes(title.toLowerCase())) &&
      (types.includes(show.type)) &&
      (following.includes(show.following)));

    this.setState({ filteredItems });
  }

  handleTableChange = (pagination, _filters, sorter) => {
    const { dataIndex, columnKey, field, order } = sorter;
    const simpleSorter = {
      dataIndex,
      columnKey,
      field,
      order,
    };

    this.props.onSetTableNav(pagination, simpleSorter);
  }

  getColumns = () => {
    const { sorter = {} } = this.props.allShows.tableNav;

    return [
      {
        dataIndex: 'type',
        width: '5rem',
        render(type) {
          return <ShowTypeIcon type={type} />;
        },
      },
      {
        dataIndex: 'title',
        sorter: tableSorters.string('title'),
        sortOrder: tableSortOrder(sorter, 'title'),
        title: (
          <TableHeadingSort name="title" sorter={sorter}>Title</TableHeadingSort>
        ),
        render(title, { aka, slug }) {
          return (
            <div>
              <Link to={`/shows/${slug}`} title="Go to details">{title}</Link>
              {aka && <Aka>{aka}</Aka>}
            </div>
          );
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
    const { allShows, onSetFilters } = this.props;
    const { filteredItems } = this.state;
    const { loading, tableNav, filters } = allShows;
    const { pagination = defaultPagination } = tableNav;

    return (
      <React.Fragment>
        <SearchBar
          filters={filters}
          onSetFilters={onSetFilters}
        />
        <Table
          className={styles.table}
          rowKey="showId"
          size="middle"
          columns={this.getColumns()}
          dataSource={filteredItems}
          loading={loading}
          pagination={{
            ...pagination,
            showTotal: () => `${filteredItems.length} total`,
          }}
          onChange={this.handleTableChange}
        />
      </React.Fragment>
    );
  }
}

AllShows.propTypes = {
  allShows: PropTypes.object.isRequired,
  onGetShows: PropTypes.func.isRequired,
  onSetFilters: PropTypes.func.isRequired,
  onSetTableNav: PropTypes.func.isRequired,
};

const mapState = (state) => ({
  allShows: allShowsSel(state),
});

const mapDispatch = (dispatch) => ({
  onGetShows: () => dispatch(getShowsRequest()),
  onSetFilters: (title, types, following) => dispatch(setAllShowsFilters(title, types, following)),
  onSetTableNav: (pagination, sorter) => dispatch(setAllShowsTableNav(pagination, sorter)),
});

export default connect(mapState, mapDispatch)(AllShows);
