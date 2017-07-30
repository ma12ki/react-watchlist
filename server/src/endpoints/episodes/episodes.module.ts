import { interfaces, ContainerModule } from 'inversify';
import { interfaces as interfacesExpressUtils, TYPE } from 'inversify-express-utils';

import { episodesTokens } from './episodes.tokens';
import { EpisodesController } from './episodes.controller';
import { EpisodesService, IEpisodesService } from './episodes.service';

const episodesModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<IEpisodesService>(episodesTokens.episodesService).to(EpisodesService);
  bind<interfacesExpressUtils.Controller>(TYPE.Controller).to(EpisodesController).whenTargetNamed('EpisodesController');
});

export { episodesModule };
