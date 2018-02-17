import { Observable } from 'rxjs/Observable';

import apiCatch from './rxjs.operator.apiCatch';

Observable.prototype.apiCatch = apiCatch;
