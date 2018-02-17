import { isDesktopSel } from '../../screen';
import { dashboardModuleName } from './constants';

//
// actions
//
export const ROUTE_DASHBOARD = `${dashboardModuleName}/ROUTE_DASHBOARD`;

//
// selectors
//
export const dashboardModuleSel = state => state[dashboardModuleName];

export const preferredViewSel = state => dashboardModuleSel(state).view;
export const effectiveViewSel = state => isDesktopSel(state) ? dashboardModuleSel(state).view : 'timeline';
