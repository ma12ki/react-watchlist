import * as moment from 'moment';

export default [
  {
    _id: 'rm3.1',
    season: 3,
    episode: 1,
    premiereDate: moment().subtract(10, 'days').toISOString(),
    watched: true,
    showId: 'rickandmorty',
  },
  {
    _id: 'rm3.2',
    season: 3,
    episode: 2,
    premiereDate: moment().subtract(3, 'days').toISOString(),
    watched: false,
    showId: 'rickandmorty',
  },
  {
    _id: 'rm3.3',
    season: 3,
    episode: 3,
    premiereDate: moment().add(3, 'days').toISOString(),
    watched: false,
    showId: 'rickandmorty',
  },

  {
    _id: 'eow2.1',
    season: 2,
    episode: 1,
    premiereDate: moment().startOf('month').subtract(2, 'months').toISOString(),
    watched: true,
    showId: 'eastofwest',
  },
  {
    _id: 'eow2.2',
    season: 2,
    episode: 2,
    premiereDate: moment().startOf('month').subtract(1, 'months').toISOString(),
    watched: false,
    showId: 'eastofwest',
  },
  {
    _id: 'eow2.3',
    season: 2,
    episode: 3,
    premiereDate: moment().startOf('month').add(1, 'months').toISOString(),
    watched: false,
    showId: 'eastofwest',
  },

  {
    _id: 'l',
    season: 0,
    episode: 0,
    premiereDate: moment().add(14, 'days').toISOString(),
    watched: false,
    showId: 'logan',
  },
];
