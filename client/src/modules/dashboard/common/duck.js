import { dashboardModuleName } from './constants';

//
// actions
//
export const ROUTE_DASHBOARD = `${dashboardModuleName}/ROUTE_DASHBOARD`;

//
// selectors
//
export const dashboardModuleSel = state => state[dashboardModuleName];
