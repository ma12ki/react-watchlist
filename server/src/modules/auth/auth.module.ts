import { interfaces, ContainerModule } from 'inversify';
import { interfaces as interfacesExpressUtils, TYPE } from 'inversify-express-utils';

import { authTokens } from './auth.tokens';
import './AuthService';
import { AuthService, IAuthService } from './AuthService';

const authModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<IAuthService>(authTokens.AuthService).to(AuthService);
});

export { authModule };
