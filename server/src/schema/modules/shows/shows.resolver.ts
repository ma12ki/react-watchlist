import { ShowModel } from './models/show.model';

const shows = async (_root, _args, _ctx) => {
  return ShowModel.find();
};

export default {
  shows,
};
