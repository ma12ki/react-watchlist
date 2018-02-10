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
  // @inject(authTokens.AuthService) private readonly authService: IAuthService;
  @inject(showsTokens.ShowsService) private readonly showsService: IShowsService;

  @httpPost('/')
  public async createShow(): Promise<IShowDetails> {
    await this.user.isInRole('root,admin');
    const show = (this.request.body as IShowDetails);
    return this.showsService.createShow(show);
  }

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
    // @requestBody('episode') episode: number,
  ): Promise<void> {
    await this.user.isInRole('root,admin,user');
    const episode = Number(this.request.body.episode);
    await this.showsService.bulkMarkEpisodeWatched(showId, season, episode, this.user.details);
  }

  @httpDelete('/:showId/episodes/mark-watched')
  public async bulkUnmarkEpisodeWatched(
    @requestParam('showId') showId: number,
    @requestBody('season') season: number,
    // @requestBody('episode') episode: number,
  ): Promise<void> {
    await this.user.isInRole('root,admin,user');
    const episode = Number(this.request.body.episode);
    await this.showsService.bulkUnmarkEpisodeWatched(showId, season, episode, this.user.details);
  }

  // @httpPost('/')
  // public async createUser(): Promise<IUser> {
  //   await this.user.isInRole('root');
  //   const user = this.request.body;
  //   return this.usersService.createUser(user);
  // }

  // @httpPut('/:userId')
  // public async updateUser(): Promise<IUser> {
  //   await this.user.isInRole('root');
  //   const user: IUser = this.request.body;
  //   if (this.user.details.userId == user.userId) {
  //     throw new BadRequestError('You cannot edit your own privileges');
  //   }
  //   return this.usersService.updateUser(user);
  // }

  // @httpDelete('/:userId')
  // public async deleteUser(@requestParam('userId') userId: number): Promise<void> {
  //   await this.user.isInRole('root');
  //   if (this.user.details.userId == userId) {
  //     throw new BadRequestError('You cannot delete yourself');
  //   }
  //   return this.usersService.deleteUser(userId);
  // }
}
