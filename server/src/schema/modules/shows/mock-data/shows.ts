import * as moment from 'moment';

export default [
  {
    _id: 'rickandmorty',
    name: 'Rick and Morty',
    category: 'TVSHOW',
    frequency: 'WEEKLY',
    premiereDate: moment().subtract(10, 'days').toISOString(),
    listed: true,
    tracked: true,
  },
  {
    _id: 'eastofwest',
    name: 'East of West',
    category: 'COMIC',
    frequency: 'MONTHLY',
    premiereDate: moment().startOf('month').subtract(2, 'months').toISOString(),
    listed: true,
    tracked: true,
  },
  {
    _id: 'logan',
    name: 'Logan',
    category: 'MOVIE',
    frequency: 'INSTANTLY',
    premiereDate: moment().subtract(5, 'days').toISOString(),
    listed: true,
    tracked: true,
  }
];
