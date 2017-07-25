import { Types } from 'mongoose';

import { ShowModel } from './models/show.model';
import { UserEpisodeModel } from './models/user-episode.model';

export default {
  Episode: {
    watched,
    premiereDate: (episode) => {
      return episode.premiereDate.toISOString();
    },
    show,
  },
};

async function watched(episode, _args, {user}): Promise<boolean> {
  if (episode.watched != null) {
    return episode.watched;
  }

  const userEpisode = await UserEpisodeModel.findOne({
    userId: Types.ObjectId(user._id),
    showId: episode.showId,
    episodeId: episode._id,
  });

  return userEpisode != null;
}

async function show(episode) {
  if (episode.show) {
    return episode.show;
  }
  return ShowModel.findById(episode.showId).lean();
}
