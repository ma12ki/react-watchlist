import * as express from 'express';
import { injectable, inject } from 'inversify';
import { interfaces, controller, httpGet, response } from 'inversify-express-utils';

import { showsTokens } from './shows.tokens';
import { IShowsService } from './shows.service';
import { IShow } from '../../entities/show';

@controller('/shows')
@injectable()
export class ShowsController implements interfaces.Controller {
    constructor(
        @inject(showsTokens.showsService) private showsService: IShowsService,
    ) {}

    @httpGet('/')
    public async getShows(@response() res: express.Response): Promise<IShow[]> {
        return this.showsService.getShows();
    }
}
