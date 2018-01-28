import { moduleName } from '../constants';

const moduleSel = (state) => state[moduleName];
export const pathnameSel = (state) => moduleSel(state).pathname;
export const typeSel = (state) => moduleSel(state).type;
export const payloadSel = (state) => moduleSel(state).payload;
export const prevSel = (state) => moduleSel(state).prev;
export const kindSel = (state) => moduleSel(state).kind;
export const routesMapSel = (state) => moduleSel(state).routesMap;
export const isCurrentLocationSel = (state, location) => typeSel(state) === location;
