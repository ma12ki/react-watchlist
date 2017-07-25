import { Types } from 'mongoose';

import { EpisodeModel } from './models/episode.model';
import { UserShowModel } from './models/user-show.model';

const premiereDate = (show) => show.premiereDate.toISOString();

const listed = async (show, _args, {user}) => {
  if (show.listed == null) {
    const userShow: any = await UserShowModel.findOne({
      userId: Types.ObjectId(user._id),
      showId: show._id,
    }).lean();

    if (userShow) {
      show.listed = true;
      show.tracked = userShow.tracked;
    } else {
      show.listed = false;
      show.tracked = false;
    }
  }
  return show.listed;
};

const tracked = async (show, _args, {user}) => {
  if (show.tracked == null) {
    const userShow: any = await UserShowModel.findOne({
      userId: Types.ObjectId(user._id),
      showId: show._id,
    }).lean();

    if (userShow) {
      show.listed = true;
      show.tracked = userShow.tracked;
    } else {
      show.listed = false;
      show.tracked = false;
    }
  }
  return show.tracked;
};

const episodes = async (show) => {
  if (show.episodes) {
    return show.episodes;
  }
  return EpisodeModel.find({
    showId: show._id,
  });
};

export default {
  Show: {
    premiereDate,
    listed,
    tracked,
    episodes,
  },
};
