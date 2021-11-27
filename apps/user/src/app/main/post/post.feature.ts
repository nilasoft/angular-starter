import {createAction, createFeatureSelector, createReducer, createSelector, on} from '@ngrx/store';
import {error, failure, payload, request, success} from '@nilasoft/core';
import {Page, Post, PostFilter} from '@nilasoft/data';
import {AppState} from '../../app.model';
import {PostState} from './post.model';

const initialState: PostState = {
  list: {}
};

export const postListFetchRequest = createAction('post/list/fetch/request', payload<Partial<PostFilter>>());
export const postListFetchSuccess = createAction('post/list/fetch/success', payload<Page<Post>>());
export const postListFetchFailure = createAction('post/list/fetch/failure', error());

export const postReducer = createReducer(
  initialState,
  on(postListFetchRequest, request('list')),
  on(postListFetchSuccess, success('list')),
  on(postListFetchFailure, failure('list'))
);

export const selectPostState = createFeatureSelector<AppState, PostState>('post');

export const selectPostList = createSelector(selectPostState, state => state.list);
