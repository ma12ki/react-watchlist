import { interfaces, ContainerModule } from 'inversify';

import './shows.controller';
import { showsTokens } from './shows.tokens';
import { ShowsService, IShowsService } from './shows.service';

const showsModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<IShowsService>(showsTokens.ShowsService).to(ShowsService);
});

export { showsModule };
