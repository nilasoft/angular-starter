import {createAction, createFeatureSelector, createReducer, on} from '@ngrx/store';
import {error, failure, payload, request, success} from '@nilasoft/core';
import {Profile} from '@nilasoft/data';
import {AppState} from '../../app.model';
import {ProfileState} from './profile.model';

const initialState: ProfileState = {};

export const profileFetchRequest = createAction('profile/fetch/request');
export const profileFetchSuccess = createAction('profile/fetch/success', payload<Profile>());
export const profileFetchFailure = createAction('profile/fetch/failure', error());

export const profileAddRequest = createAction('profile/add/request', payload<Profile>());
export const profileAddSuccess = createAction('profile/add/success', payload<Profile>());
export const profileAddFailure = createAction('profile/add/failure', error());

export const profileEditRequest = createAction('profile/edit/request', payload<Profile>());
export const profileEditSuccess = createAction('profile/edit/success', payload<Profile>());
export const profileEditFailure = createAction('profile/edit/failure', error());

export const postReducer = createReducer(
  initialState,
  on(profileFetchRequest, request()),
  on(profileFetchSuccess, success()),
  on(profileFetchFailure, failure()),
  on(profileAddRequest, request()),
  on(profileAddSuccess, success()),
  on(profileAddFailure, failure()),
  on(profileEditRequest, request()),
  on(profileEditSuccess, success()),
  on(profileEditFailure, failure())
);

export const selectProfileState = createFeatureSelector<AppState, ProfileState>('profile');
