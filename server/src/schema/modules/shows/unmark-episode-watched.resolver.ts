import { EpisodeModel } from './models/episode.model';
import { UserEpisodeModel } from './models/user-episode.model';

async function unmarkEpisodeWatched(_root, {episodeId}, {user}) {
  return unmarkEpisodeWatchedDb(episodeId, user);
}

async function unmarkEpisodeWatchedDb(episodeId, user) {
  const episode = await EpisodeModel.findById(episodeId);

  if (!episode) {
    throw new Error(`Episode with ID ${episodeId} does not exist`);
  }

  const userEpisode = await UserEpisodeModel.findOne({
    userId: user._id,
    showId: episode.showId,
    episodeId,
  });

  if (!userEpisode) {
    throw new Error(`Episode with ID ${episodeId} is is not on the list for user ${user.name}`);
  }

  await UserEpisodeModel.findOneAndRemove({
    userId: user._id,
    showId: episode.showId,
    episodeId,
  });

  return episode.toObject();
}

export default {
  unmarkEpisodeWatched,
};

export {
  unmarkEpisodeWatchedDb,
};
