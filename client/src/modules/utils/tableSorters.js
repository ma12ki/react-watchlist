// sorters for the <Table> component of antd
// you can pass them as the 'sorter' property of column config
// see https://ant.design/components/table/#Column
// usage: sort: sorter.text('name')

import moment from 'moment';

const text = (key) => (a, b) => {
  const valueA = a[key].toLowerCase();
  const valueB = b[key].toLowerCase();

  if (valueA < valueB) {
    return -1;
  }
  if (valueA > valueB) {
    return 1;
  }
  return 0;
};

const textMulti = (...keys) => (a, b) => keys.reduce((ret, key) => {
  if (ret !== 0) {
    return ret;
  }

  const valueA = a[key].toLowerCase();
  const valueB = b[key].toLowerCase();

  if (valueA < valueB) {
    return -1;
  }
  if (valueA > valueB) {
    return 1;
  }
  return 0;
}, 0);

const number = (key) => (a, b) => a[key] - b[key];

const date = (key) => (a, b) => {
  const valueA = moment(a[key]);
  const valueB = b[key];

  if (valueA.isBefore(valueB)) {
    return -1;
  }
  if (valueA.isAfter(valueB)) {
    return 1;
  }
  return 0;
};

export default {
  string: text,
  stringMulti: textMulti,
  text,
  textMulti,
  number,
  date,
};
