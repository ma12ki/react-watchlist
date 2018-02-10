import { interfaces, ContainerModule } from 'inversify';
import { interfaces as interfacesExpressUtils, TYPE } from 'inversify-express-utils';

import './users.controller';
import { usersTokens } from './users.tokens';
import { UsersService, IUsersService } from './users.service';

const usersModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<IUsersService>(usersTokens.UsersService).to(UsersService);
});

export { usersModule };
