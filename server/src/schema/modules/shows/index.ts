import { IModule } from '../shared';

import showTypeResolver from './show.resolver';
import showType from './show.type';

import episodeTypeResolver from './episode.resolver';
import episodeType from './episode.type';

import showsQuery from './shows.query';
import showsQueryResolver from './shows.resolver';

import availableEpisodesQuery from './available-episodes.query';
import availableEpisodesQueryResolver from './available-episodes.resolver';

import upcomingEpisodesQuery from './upcoming-episodes.query';
import upcomingEpisodesQueryResolver from './upcoming-episodes.resolver';

import addShowMutation from './add-show.mutation';
import addShowMutationResolver from './add-show.resolver';

import addShowToListMutation from './add-show-to-list.mutation';
import addShowToListMutationResolver from './add-show-to-list.resolver';

import removeShowFromListMutation from './remove-show-from-list.mutation';
import removeShowFromListMutationResolver from './remove-show-from-list.resolver';

import trackShowMutation from './track-show.mutation';
import trackShowMutationResolver from './track-show.resolver';

import untrackShowMutation from './untrack-show.mutation';
import untrackShowMutationResolver from './untrack-show.resolver';

import markEpisodeWatchedMutation from './mark-episode-watched.mutation';
import markEpisodeWatchedMutationResolver from './mark-episode-watched.resolver';

import unmarkEpisodeWatchedMutation from './unmark-episode-watched.mutation';
import unmarkEpisodeWatchedMutationResolver from './unmark-episode-watched.resolver';

import postponeEpisodesMutation from './postpone-episodes.mutation';
import postponeEpisodesMutationResolver from './postpone-episodes.resolver';

import categoryEnum from './categories.enum';
import frequencyEnum from './frequencies.enum';

const queries = `
  ${showsQuery}
  ${availableEpisodesQuery}
  ${upcomingEpisodesQuery}
`;

const queryResolvers = {
  ...showsQueryResolver,
  ...availableEpisodesQueryResolver,
  ...upcomingEpisodesQueryResolver,
};

const typeDefs = [
  showType,
  episodeType,
  categoryEnum,
  frequencyEnum,
];

const typeResolvers = {
  ...showTypeResolver,
  ...episodeTypeResolver,
};

const mutations = `
  ${addShowMutation}
  ${addShowToListMutation}
  ${removeShowFromListMutation}
  ${trackShowMutation}
  ${untrackShowMutation}
  ${markEpisodeWatchedMutation}
  ${unmarkEpisodeWatchedMutation}
  ${postponeEpisodesMutation}
`;

const mutationResolvers = {
  ...addShowMutationResolver,
  ...addShowToListMutationResolver,
  ...removeShowFromListMutationResolver,
  ...trackShowMutationResolver,
  ...untrackShowMutationResolver,
  ...markEpisodeWatchedMutationResolver,
  ...unmarkEpisodeWatchedMutationResolver,
  ...postponeEpisodesMutationResolver,
};

export const showsModule: IModule = {
  typeDefs,
  typeResolvers,
  queries,
  queryResolvers,
  mutations,
  mutationResolvers,
};
