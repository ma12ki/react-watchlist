import { Schema, model, Document } from 'mongoose';

import { IUserShow } from './../interfaces/user-show.interface';

interface IUserShowModel extends IUserShow, Document {}

const UserShowSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  showId: {
    type: Schema.Types.ObjectId,
    ref: 'Show',
  },
  tracked: {
    type: Boolean,
    required: true,
    default: false,
  },
});

UserShowSchema.index({ _id: 1, type: 1 });
UserShowSchema.index({ userId: 1, type: 1 });
UserShowSchema.index({ showId: 1, type: 1 });

const UserShowModel = model<IUserShowModel>('UserShow', UserShowSchema);

export {
  IUserShowModel,
  UserShowSchema,
  UserShowModel,
};
