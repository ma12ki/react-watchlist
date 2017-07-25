import { EpisodeModel } from './models/episode.model';
import { UserEpisodeModel } from './models/user-episode.model';

async function markEpisodeWatched(_root, {episodeId}, {user}) {
  return markEpisodeWatchedDb(episodeId, user);
}

async function markEpisodeWatchedDb(episodeId, user) {
  const episode = await EpisodeModel.findById(episodeId);

  if (!episode) {
    throw new Error(`Episode with ID ${episodeId} does not exist`);
  }

  const userEpisode = await UserEpisodeModel.findOne({
    userId: user._id,
    showId: episode.showId,
    episodeId,
  });

  if (userEpisode) {
    throw new Error(`Episode with ID ${episodeId} is already marked as watched for user ${user.name}`);
  }

  await UserEpisodeModel.create({
    userId: user._id,
    showId: episode.showId,
    episodeId,
  });

  return episode.toObject();
}

export default {
  markEpisodeWatched,
};

export {
  markEpisodeWatchedDb,
};
