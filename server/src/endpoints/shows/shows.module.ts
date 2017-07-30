import { interfaces, ContainerModule } from 'inversify';
import { interfaces as interfacesExpressUtils, TYPE } from 'inversify-express-utils';

import { showsTokens } from './shows.tokens';
import { ShowsController } from './shows.controller';
import { ShowsService, IShowsService } from './shows.service';

const showsModule = new ContainerModule((bind: interfaces.Bind) => {
    bind<IShowsService>(showsTokens.showsService).to(ShowsService);
    bind<interfacesExpressUtils.Controller>(TYPE.Controller).to(ShowsController).whenTargetNamed('ShowsController');
});

export { showsModule };
