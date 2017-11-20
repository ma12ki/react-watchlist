import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { groupBy, orderBy } from 'lodash';
// import { apiService } from '../utils';

const getAvailableEpisodes$ = () => Observable.of(mockEpisodes) // apiService.get$(`/user/episodes/available`);
  .map(mapDtoToModel);

const mapDtoToModel = (episodes) => {
  const groups = groupBy(episodes, (ep) => ep.showId);
  const nested = Object.keys(groups).map((showId) => ({
    ...groups[showId][0],
    episodes: groups[showId],
    count: groups[showId].length,
  }));

  return orderBy(nested, ['premiereDate', 'title']);
};

const mockEpisodes = [
  {
    showId: 0,
    title: 'Firefly',
    category: 'TV',

    episodeId: 0,
    season: 3,
    episode: 1,
    premiereDate: '2017-09-19T22:47:51.085Z',
  },
  {
    showId: 0,
    title: 'Firefly',
    category: 'TV',

    episodeId: 0,
    season: 3,
    episode: 2,
    premiereDate: '2017-10-19T22:47:51.085Z',
  },
  {
    showId: 0,
    title: 'Firefly',
    category: 'TV',

    episodeId: 0,
    season: 3,
    episode: 3,
    premiereDate: '2017-11-19T22:47:51.085Z',
  },
  {
    showId: 1,
    title: 'Star Wars Episode X',
    category: 'MOVIE',

    episodeId: 0,
    season: 0,
    episode: 0,
    premiereDate: '2017-12-19T02:47:51.085Z',
  },
];

export {
  getAvailableEpisodes$,
};
