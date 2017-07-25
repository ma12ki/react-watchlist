import * as moment from 'moment';

import { UserShowModel } from './models/user-show.model';
import { EpisodeModel } from "./models/episode.model";

const addLtDate = (condition, date) => {
  if (date) {
    return Object.assign({},
      condition,
      { $lt: moment(date).endOf('day').toISOString() },
    );
  }

  return condition;
};

const upcomingEpisodes = async (_root, {maxDate, cursor}, {user}) => {
  const now = moment().endOf('day').toISOString();
  const limit = 10;
  const userShows = await UserShowModel.find({
    userId: user._id,
    tracked: true,
  }).select({
    showId: 1,
  }).lean() as any[];
  const userShowIds = userShows.map((s) => s.showId);

  const episodes = await EpisodeModel.find({
    showId: { $in: userShowIds },
    premiereDate: addLtDate({ $gt: now }, maxDate),
  }).sort({
    premiereDate: 1,
    _id: 1,
  }).limit(maxDate || cursor ? null : limit)
  .lean() as any[];

  // TODO: optimize finding by cursor
  if (cursor) {
    const cursorIndex = episodes.findIndex((episode) => '' + episode._id === cursor);
    return episodes.slice(cursorIndex + 1, cursorIndex + 1 + limit);
  }

  return episodes;
};

export default {
  upcomingEpisodes,
};
