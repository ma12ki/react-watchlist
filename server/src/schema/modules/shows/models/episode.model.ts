import { Schema, model, Document } from 'mongoose';

import { IEpisode } from './../interfaces/episode.interface';

interface IEpisodeModel extends IEpisode, Document {}

const EpisodeSchema = new Schema({
  showId: {
    type: Schema.Types.ObjectId,
    ref: 'Show',
  },
  premiereDate: {
    type: Date,
    required: true,
  },
  season: {
    type: Number,
    required: true,
    default: 0,
  },
  episode: {
    type: Number,
    required: true,
    default: 0,
  },
});

EpisodeSchema.index({ _id: 1, type: 1 });

const EpisodeModel = model<IEpisodeModel>('Episode', EpisodeSchema);

export {
  IEpisodeModel,
  EpisodeSchema,
  EpisodeModel,
};
