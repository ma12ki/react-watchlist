import { ShowModel } from './models/show.model';
import { UserShowModel } from './models/user-show.model';

async function removeShowFromList(_root, {showId}, {user}) {
  return removeShowFromListDb(showId, user);
}

async function removeShowFromListDb(showId, user) {
  const show = await ShowModel.findById(showId);

  if (!show) {
    throw new Error(`Show with ID ${showId} does not exist`);
  }

  await UserShowModel.findOneAndRemove({
    userId: user._id,
    showId,
  });

  return show.toObject();
}

export default {
  removeShowFromList,
};

export {
  removeShowFromListDb,
};
