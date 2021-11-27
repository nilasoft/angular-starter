import {getSelectors, RouterReducerState} from '@ngrx/router-store';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {BaseState, ItemMode} from './core.model';

const selectRouter = createFeatureSelector<BaseState, RouterReducerState>('router');

const selectors = getSelectors(selectRouter);

export {selectRouter};

export const selectRouterUrl = selectors.selectUrl;

export const selectRouterCurrentRoute = selectors.selectCurrentRoute;

export const selectRouterFragment = selectors.selectFragment;

export const selectRouterQueryParams = selectors.selectQueryParams;

export const selectRouterQueryParam = selectors.selectQueryParam;

export const selectRouterRouteParams = selectors.selectRouteParams;

export const selectRouterRouteParam = selectors.selectRouteParam;

export const selectRouterRouteData = selectors.selectRouteData;

export const selectRouterItemMode = createSelector(selectRouterRouteData, data => data.mode as ItemMode);
