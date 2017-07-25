import * as moment from 'moment';

import { UserShowModel } from './models/user-show.model';
import { EpisodeModel } from './models/episode.model';
import { UserEpisodeModel } from './models/user-episode.model';

const availableEpisodes = async (_root, _args, {user}) => {
  const now = moment().endOf('day').toISOString();

  const userShows = await UserShowModel.find({
    userId: user._id,
    tracked: true,
  }).select({
    showId: 1,
  }).lean() as any[];

  const userShowIds = userShows.map((s) => s.showId);

  const userEpisodes = await UserEpisodeModel.find({
    userId: user._id,
  }).select({
    episodeId: 1,
  }).lean() as any[];

  const userEpisodeIds = userEpisodes.map((ep) => ep.episodeId);

  return EpisodeModel.find({
    _id: { $nin: userEpisodeIds },
    showId: { $in: userShowIds },
    premiereDate: { $lte: now },
  }).sort({
    premiereDate: 1,
  }).lean();
};

export default {
  availableEpisodes,
};
