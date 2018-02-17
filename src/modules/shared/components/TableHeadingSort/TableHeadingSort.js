import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import ArrowUpIcon from 'material-ui-icons/ArrowUpward';
import ArrowDownIcon from 'material-ui-icons/ArrowDownward';
import SwapVertIcon from 'material-ui-icons/SwapVert';

import styles from './TableHeadingSort.css';

const TableHeadingSort = ({ name, sorter, children, className }) => {
  const icon = getIcon(name, sorter);
  const classNames = cn(
    styles.heading,
    name === sorter.field && sorter.order || 'nosort',
    className,
  );

  return <div className={classNames}>{children}{' '}{icon}</div>;
};

// eslint-disable-next-line react/no-multi-comp
const getIcon = (name, sorter) => {
  if (name === sorter.field) {
    if (sorter.order === 'ascend') {
      return <ArrowUpIcon className={styles.sortIcon} />;
    }
    return <ArrowDownIcon className={styles.sortIcon} />;
  }
  return <SwapVertIcon className={styles.sortIcon} />;
};

TableHeadingSort.propTypes = {
  name: PropTypes.string.isRequired,
  sorter: PropTypes.shape({
    columnKey: PropTypes.string,
    field: PropTypes.string,
    order: PropTypes.oneOf(['ascend', 'descend']),
  }),
  className: PropTypes.string,
  children: PropTypes.node,
};

TableHeadingSort.defaultProps = {
  sorter: {},
};

export default TableHeadingSort;
