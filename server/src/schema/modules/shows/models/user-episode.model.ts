import { Schema, model, Document } from 'mongoose';

import { IUserEpisode } from './../interfaces/user-episode.interface';

interface IUserEpisodeModel extends IUserEpisode, Document {}

const UserEpisodeSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  showId: {
    type: Schema.Types.ObjectId,
    ref: 'Show',
  },
  episodeId: {
    type: Schema.Types.ObjectId,
    ref: 'Episode',
  },
});

UserEpisodeSchema.index({ _id: 1, type: 1 });
UserEpisodeSchema.index({ userId: 1, type: 1 });
UserEpisodeSchema.index({ showId: 1, type: 1 });
UserEpisodeSchema.index({ episodeId: 1, type: 1 });

const UserEpisodeModel = model<IUserEpisodeModel>('UserEpisode', UserEpisodeSchema);

export {
  IUserEpisodeModel,
  UserEpisodeSchema,
  UserEpisodeModel,
};
