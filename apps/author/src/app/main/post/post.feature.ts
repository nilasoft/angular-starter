import {createAction, createFeatureSelector, createReducer, createSelector, on} from '@ngrx/store';
import {error, failure, payload, request, success} from '@nilasoft/core';
import {Page, Pageable, Post} from '@nilasoft/data';
import {AppState} from '../../app.model';
import {PostState} from './post.model';

const initialState: PostState = {
  list: {},
  item: {}
};

export const postListFetchRequest = createAction('post/list/fetch/request', payload<Partial<Pageable>>());
export const postListFetchSuccess = createAction('post/list/fetch/success', payload<Page<Post>>());
export const postListFetchFailure = createAction('post/list/fetch/failure', error());

export const postItemAddRequest = createAction('post/item/add/request', payload<Post>());
export const postItemAddSuccess = createAction('post/item/add/success', payload<Post>());
export const postItemAddFailure = createAction('post/item/add/failure', error());

export const postItemFetchRequest = createAction('post/item/fetch/request', payload<number>());
export const postItemFetchSuccess = createAction('post/item/fetch/success', payload<Post>());
export const postItemFetchFailure = createAction('post/item/fetch/failure', error());

export const postItemEditRequest = createAction('post/item/edit/request', payload<Post>());
export const postItemEditSuccess = createAction('post/item/edit/success', payload<Post>());
export const postItemEditFailure = createAction('post/item/edit/failure', error());

export const postItemDeleteRequest = createAction('post/item/delete/request', payload<number>());
export const postItemDeleteSuccess = createAction('post/item/delete/success', payload<Post>());
export const postItemDeleteFailure = createAction('post/item/delete/failure', error());

export const postReducer = createReducer(
  initialState,
  on(postListFetchRequest, request('list')),
  on(postListFetchSuccess, success('list')),
  on(postListFetchFailure, failure('list')),
  on(postItemAddRequest, request('item')),
  on(postItemAddSuccess, success('item')),
  on(postItemAddFailure, failure('item')),
  on(postItemFetchRequest, request('item')),
  on(postItemFetchSuccess, success('item')),
  on(postItemFetchFailure, failure('item')),
  on(postItemEditRequest, request('item')),
  on(postItemEditSuccess, success('item')),
  on(postItemEditFailure, failure('item')),
  on(postItemDeleteRequest, request('item')),
  on(postItemDeleteSuccess, success('item')),
  on(postItemDeleteFailure, failure('item'))
);

export const selectPostState = createFeatureSelector<AppState, PostState>('post');

export const selectPostList = createSelector(selectPostState, state => state.list);

export const selectPostItem = createSelector(selectPostState, state => state.item);
