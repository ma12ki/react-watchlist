import * as express from 'express';
import { injectable, inject } from 'inversify';
import { interfaces, controller, httpGet, response } from 'inversify-express-utils';

import { seasonsTokens } from './seasons.tokens';
import { ISeasonsService } from './seasons.service';
import { ISeason } from '../../entities/season';

@controller('/seasons')
@injectable()
export class SeasonsController implements interfaces.Controller {
  constructor(
    @inject(seasonsTokens.seasonsService) private seasonsService: ISeasonsService,
  ) {}

  @httpGet('/')
  public async getSeasons(@response() res: express.Response): Promise<ISeason[]> {
    return this.seasonsService.getSeasons();
  }
}
