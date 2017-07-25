import { Schema, model, Document } from 'mongoose';

import { IShow } from './../interfaces/show.interface';

interface IShowModel extends IShow, Document {}

const ShowSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  premiereDate: {
    type: Date,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  frequency: {
    type: String,
    required: false,
  },
});

ShowSchema.index({ _id: 1, type: 1 });

const ShowModel = model<IShowModel>('Show', ShowSchema);

export {
  IShowModel,
  ShowSchema,
  ShowModel,
};
