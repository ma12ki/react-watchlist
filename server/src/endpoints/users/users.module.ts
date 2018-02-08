import { interfaces, ContainerModule } from 'inversify';
import { interfaces as interfacesExpressUtils, TYPE } from 'inversify-express-utils';

import { usersTokens } from './users.tokens';
// import { ShowsController } from './shows.controller';
import { UsersService, IUsersService } from './users.service';

const usersModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<IUsersService>(usersTokens.UsersService).to(UsersService);
  // bind<interfacesExpressUtils.Controller>(TYPE.Controller).to(ShowsController).whenTargetNamed('ShowsController');
});

export { usersModule };
