import { ShowModel } from './models/show.model';
import { UserShowModel } from './models/user-show.model';

async function untrackShow(_root, {showId}, {user}) {
  return untrackShowDb(showId, user);
}

async function untrackShowDb(showId, user) {
  const show = await ShowModel.findById(showId);

  if (!show) {
    throw new Error(`Show with ID ${showId} does not exist`);
  }

  const userShow = await UserShowModel.findOne({
    userId: user._id,
    showId,
  });

  if (!userShow) {
    throw new Error(`Show with ID ${showId} is not the list for user ${user.name}`);
  }

  await userShow.update({
    $set: {
      tracked: false,
    },
  });

  return show.toObject();
}

export default {
  untrackShow,
};

export {
  untrackShowDb,
};
