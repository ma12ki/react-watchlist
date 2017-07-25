import * as moment from 'moment';

import { isRecurring, getAmountAndUnit } from '../../../../../common/dictionary';

import { INewEpisode } from './interfaces/episode.interface';
import { EpisodeModel } from './models/episode.model';
import { ShowModel } from './models/show.model';

export default {
  addShow,
};

async function addShow(
  _root, {
    name,
    premiereDate,
    category,
    frequency,
    season,
    episodes,
  }) {
    const show = {
      name,
      premiereDate,
      category,
      frequency,
    };

    const createdShow = await ShowModel.create(show);
    const createdEpisodes = await addEpisodes(
      createdShow._id,
      premiereDate,
      category,
      frequency,
      season,
      episodes,
    );

    return {
      ...createdShow.toObject(),
      episodes: createdEpisodes,
    };
}

async function addEpisodes(
  showId: string,
  premiereDate: string,
  category: string,
  frequency: string,
  season = 0,
  episodes = 0,
) {
  const eps = generateEpisodes(
    showId,
    premiereDate,
    category,
    frequency,
    season,
    episodes,
  );

  const createdEpisodes = await EpisodeModel.insertMany(eps);

  return createdEpisodes;
}

function generateEpisodes(
  showId: string,
  startDate: string,
  categoryId: string,
  frequencyId: string,
  season = 0,
  episodes = 0,
  ): INewEpisode[] {
    if (!isRecurring(categoryId)) {
      return [{
        showId,
        season,
        episode: episodes,
        premiereDate: startDate,
      }];
    }

    const { amount, unit } = getAmountAndUnit(frequencyId);
    const items: INewEpisode[] = [];

    for (let i = 0; i < episodes; i++) {
      items.push({
        showId,
        premiereDate: moment(startDate).add( (amount * i) as any, unit).toISOString(),
        season,
        episode: i + 1,
      });
    }

    return items;
}
