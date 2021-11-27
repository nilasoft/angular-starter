import {createAction, createFeatureSelector, createReducer, createSelector, on} from '@ngrx/store';
import {error, failure, payload, request, success} from '@nilasoft/core';
import {Page, Pageable, User} from '@nilasoft/data';
import {AppState} from '../../app.model';
import {UserState} from './user.model';

const initialState: UserState = {
  list: {},
  item: {}
};

export const userListFetchRequest = createAction('user/list/fetch/request', payload<Partial<Pageable>>());
export const userListFetchSuccess = createAction('user/list/fetch/success', payload<Page<User>>());
export const userListFetchFailure = createAction('user/list/fetch/failure', error());

export const userItemAddRequest = createAction('user/item/add/request', payload<User>());
export const userItemAddSuccess = createAction('user/item/add/success', payload<User>());
export const userItemAddFailure = createAction('user/item/add/failure', error());

export const userItemFetchRequest = createAction('user/item/fetch/request', payload<number>());
export const userItemFetchSuccess = createAction('user/item/fetch/success', payload<User>());
export const userItemFetchFailure = createAction('user/item/fetch/failure', error());

export const userItemEditRequest = createAction('user/item/edit/request', payload<User>());
export const userItemEditSuccess = createAction('user/item/edit/success', payload<User>());
export const userItemEditFailure = createAction('user/item/edit/failure', error());

export const userItemDeleteRequest = createAction('user/item/delete/request', payload<number>());
export const userItemDeleteSuccess = createAction('user/item/delete/success', payload<User>());
export const userItemDeleteFailure = createAction('user/item/delete/failure', error());

export const userReducer = createReducer(
  initialState,
  on(userListFetchRequest, request('list')),
  on(userListFetchSuccess, success('list')),
  on(userListFetchFailure, failure('list')),
  on(userItemAddRequest, request('item')),
  on(userItemAddSuccess, success('item')),
  on(userItemAddFailure, failure('item')),
  on(userItemFetchRequest, request('item')),
  on(userItemFetchSuccess, success('item')),
  on(userItemFetchFailure, failure('item')),
  on(userItemEditRequest, request('item')),
  on(userItemEditSuccess, success('item')),
  on(userItemEditFailure, failure('item')),
  on(userItemDeleteRequest, request('item')),
  on(userItemDeleteSuccess, success('item')),
  on(userItemDeleteFailure, failure('item'))
);

export const selectUserState = createFeatureSelector<AppState, UserState>('user');

export const selectUserList = createSelector(selectUserState, state => state.list);

export const selectUserItem = createSelector(selectUserState, state => state.item);
