import { ContainerModule, interfaces } from 'inversify';

import { dbTokens } from './db.tokens';
import { db, IDb } from './index';

const dbModule = new ContainerModule((bind: interfaces.Bind) => {
    bind<IDb>(dbTokens.db).toConstantValue(db);
});

export { dbModule };
