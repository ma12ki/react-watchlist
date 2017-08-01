import * as express from 'express';
import { injectable, inject } from 'inversify';
import { interfaces, controller, httpGet, response } from 'inversify-express-utils';

import { episodesTokens } from './episodes.tokens';
import { IEpisodesService, IEpisodeWithShow } from './episodes.service';
import { IEpisode } from '../../entities/episode';

@controller('/episodes')
@injectable()
export class EpisodesController implements interfaces.Controller {
  constructor(
    @inject(episodesTokens.episodesService) private episodesService: IEpisodesService,
  ) {}

  @httpGet('/')
  public async getEpisodes(@response() res: express.Response): Promise<IEpisode[]> {
    return this.episodesService.getEpisodes();
  }

  @httpGet('/available')
  public async getAvailable(@response() res: express.Response): Promise<IEpisodeWithShow[]> {
    return this.episodesService.getAvailable();
  }

  @httpGet('/upcoming')
  public async getUpcoming(@response() res: express.Response): Promise<IEpisodeWithShow[]> {
    return this.episodesService.getUpcoming();
  }
}
