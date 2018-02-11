import * as express from 'express';
import { inject } from 'inversify';
import {
  controller,
  httpGet,
  httpPost,
  httpPut,
  httpDelete,
  requestParam,
  requestBody,
} from 'inversify-express-utils';

import { BadRequestError, NotAuthorizedError } from '../../helpers';
import { IUser, IShowDetails, IShowForUser, IShowDetailsForUser } from '../../entities';
import { BaseHttpController } from '../utils';
import { authTokens, IAuthService } from '../auth';
import { showsTokens } from './shows.tokens';
import { IShowsService } from './shows.service';

@controller('/shows')
export class ShowsController extends BaseHttpController {
  @inject(showsTokens.ShowsService) private readonly showsService: IShowsService;

  @httpGet('/')
  public async getShows(): Promise<IShowForUser[]> {
    await this.user.isInRole('root,admin,user');
    return this.showsService.getShows(this.user.details.userId);
  }

  @httpGet('/:slug')
  public async getShowBySlug(@requestParam('slug') slug: string): Promise<IShowDetailsForUser> {
    await this.user.isInRole('root,admin,user');
    return this.showsService.getShowBySlug(slug, this.user.details.userId);
  }

  @httpPost('/')
  public async createShow(): Promise<IShowDetails> {
    await this.user.isInRole('root,admin');
    const show = (this.request.body as IShowDetails);
    return this.showsService.createShow(show);
  }

  @httpPut('/:showId')
  public async updateShow(): Promise<IShowDetails> {
    await this.user.isInRole('root,admin');
    const show = (this.request.body as IShowDetails);
    return this.showsService.updateShow(show);
  }

  @httpDelete('/:showId')
  public async deleteShow(@requestParam('showId') showId: number): Promise<void> {
    await this.user.isInRole('root,admin');
    const show = (this.request.body as IShowDetails);
    await this.showsService.deleteShow(showId);
  }

  @httpDelete('/:showId/episodes')
  public async deleteEpisodes(@requestParam('showId') showId: number, @requestBody('season') season: number): Promise<void> {
    await this.user.isInRole('root,admin');
    // getting like this because it's optional and if not provided then @requestBody('episodes') returns thole body instead
    const episode = Number(this.request.body.episode);
    await this.showsService.deleteEpisodes(showId, season, episode);
  }

  @httpPost('/:showId/episodes/postpone')
  public async postponeEpisodes(
    @requestParam('showId') showId: number,
    @requestBody('season') season: number,
    @requestBody('episode') episode: number,
    @requestBody('newPremiereDate') newPremiereDate: string,
  ): Promise<void> {
    await this.user.isInRole('root,admin');
    await this.showsService.postponeEpisodes(showId, season, episode, new Date(newPremiereDate));
  }

  @httpPost('/:showId/follow')
  public async followShow(@requestParam('showId') showId: number): Promise<void> {
    await this.user.isInRole('root,admin,user');
    await this.showsService.followShow(showId, this.user.details);
  }

  @httpDelete('/:showId/follow')
  public async unfollowShow(@requestParam('showId') showId: number): Promise<void> {
    await this.user.isInRole('root,admin,user');
    await this.showsService.unfollowShow(showId, this.user.details);
  }

  @httpPost('/:showId/episodes/:episodeId/mark-watched')
  public async markEpisodeWatched(@requestParam('episodeId') episodeId: number): Promise<void> {
    await this.user.isInRole('root,admin,user');
    await this.showsService.markEpisodeWatched(episodeId, this.user.details);
  }

  @httpDelete('/:showId/episodes/:episodeId/mark-watched')
  public async unmarkEpisodeWatched(@requestParam('episodeId') episodeId: number): Promise<void> {
    await this.user.isInRole('root,admin,user');
    await this.showsService.unmarkEpisodeWatched(episodeId, this.user.details);
  }

  @httpPost('/:showId/episodes/mark-watched')
  public async bulkMarkEpisodeWatched(
    @requestParam('showId') showId: number,
    @requestBody('season') season: number,
  ): Promise<void> {
    await this.user.isInRole('root,admin,user');
    // getting like this because it's optional and if not provided then @requestBody('episodes') returns thole body instead
    const episode = Number(this.request.body.episode);
    await this.showsService.bulkMarkEpisodeWatched(showId, season, episode, this.user.details);
  }

  @httpDelete('/:showId/episodes/mark-watched')
  public async bulkUnmarkEpisodeWatched(
    @requestParam('showId') showId: number,
    @requestBody('season') season: number,
  ): Promise<void> {
    await this.user.isInRole('root,admin,user');
    // getting like this because it's optional and if not provided then @requestBody('episodes') returns thole body instead
    const episode = Number(this.request.body.episode);
    await this.showsService.bulkUnmarkEpisodeWatched(showId, season, episode, this.user.details);
  }
}
