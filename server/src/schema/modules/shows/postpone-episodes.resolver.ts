import * as moment from 'moment';

import { getAmountAndUnit } from '../../../../../common/dictionary';

import { EpisodeModel } from './models/episode.model';
import { ShowModel } from './models/show.model';

export default {
  postponeEpisodes,
};

async function postponeEpisodes(
  _root, {
    episodeId,
    postponeUntil,
  }) {
    const rootEpisode = await EpisodeModel.findByIdAndUpdate(
      episodeId,
      {
        $set: {
          premiereDate: moment(postponeUntil).toISOString(),
        },
      },
    );
    const show = await ShowModel.findById(rootEpisode.showId);

    const futureEpisodes = await EpisodeModel.find({
      showId: rootEpisode.showId,
      season: rootEpisode.season,
      premiereDate: { $gt: rootEpisode.premiereDate },
    }).sort({
      episode: 1,
    });

    const { amount, unit } = getAmountAndUnit(show.frequency);

    await futureEpisodes.map(async (ep) => {
      const newPremiereDate = moment(postponeUntil)
        .add(((ep.episode - rootEpisode.episode) * amount) as any, unit);

      return ep.update({
        $set: {
          premiereDate: newPremiereDate.toISOString(),
        },
      });
    });

    return {
      ...rootEpisode.toObject(),
    };
}

// async function addEpisodes(
//   showId: string,
//   premiereDate: string,
//   category: string,
//   frequency: string,
//   season = 0,
//   episodes = 0,
// ) {
//   const eps = generateEpisodes(
//     showId,
//     premiereDate,
//     category,
//     frequency,
//     season,
//     episodes,
//   );

//   const createdEpisodes = await EpisodeModel.insertMany(eps);
//   return createdEpisodes;
// };

// function generateEpisodes(
//   showId: string,
//   startDate: string,
//   categoryId: string,
//   frequencyId: string,
//   season = 0,
//   episodes = 0,
//   ): INewEpisode[] {
//     if (!isRecurring(categoryId)) {
//       return [{
//         showId,
//         season,
//         episode: episodes,
//         premiereDate: startDate,
//       }];
//     }

//     const { amount, unit } = getAmountAndUnit(frequencyId);
//     const items: INewEpisode[] = [];

//     for (let i = 0; i < episodes; i++) {
//       items.push({
//         showId,
//         premiereDate: moment(startDate).add( <any> (amount * i), unit).toISOString(),
//         season,
//         episode: i + 1,
//       });
//     }

//     return items;
// }
