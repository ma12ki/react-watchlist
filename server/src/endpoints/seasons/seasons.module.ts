import { interfaces, ContainerModule } from 'inversify';
import { interfaces as interfacesExpressUtils, TYPE } from 'inversify-express-utils';

import { seasonsTokens } from './seasons.tokens';
import { SeasonsController } from './seasons.controller';
import { SeasonsService, ISeasonsService } from './seasons.service';

const seasonsModule = new ContainerModule((bind: interfaces.Bind) => {
    bind<ISeasonsService>(seasonsTokens.seasonsService).to(SeasonsService);
    bind<interfacesExpressUtils.Controller>(TYPE.Controller).to(SeasonsController).whenTargetNamed('SeasonsController');
});

export { seasonsModule };
