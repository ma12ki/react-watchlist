import { ShowModel } from './models/show.model';
import { UserShowModel } from './models/user-show.model';

async function trackShow(_root, {showId}, {user}) {
  return trackShowDb(showId, user);
}

async function trackShowDb(showId, user) {
  const show = await ShowModel.findById(showId);

  if (!show) {
    throw new Error(`Show with ID ${showId} does not exist`);
  }

  const userShow = await UserShowModel.findOne({
    userId: user._id,
    showId,
  });

  if (!userShow) {
    await UserShowModel.create({
      userId: user._id,
      showId,
      tracked: true,
    });
  } else {
    await userShow.update({
      $set: {
        tracked: true,
      },
    });
  }

  return show.toObject();
}

export default {
  trackShow,
};

export {
  trackShowDb,
};
