import { ShowModel } from './models/show.model';
import { UserShowModel } from './models/user-show.model';

async function addShowToList(_root, {showId}, {user}) {
  return addShowToListDb(showId, user);
}

async function addShowToListDb(showId, user) {
  const show = await ShowModel.findById(showId);

  if (!show) {
    throw new Error(`Show with ID ${showId} does not exist`);
  }

  const userShow = await UserShowModel.findOne({
    userId: user._id,
    showId,
  });

  if (userShow) {
    throw new Error(`Show with ID ${showId} is already on the list for user ${user.name}`);
  }

  await UserShowModel.create({
    userId: user._id,
    showId,
  });

  return show.toObject();
}

export default {
  addShowToList,
};

export {
  addShowToListDb,
};
