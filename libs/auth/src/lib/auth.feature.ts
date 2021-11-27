import {createAction, createFeatureSelector, createReducer, createSelector, on} from '@ngrx/store';
import {error, failure, payload, request, success} from '@nilasoft/core';
import {Authorization, LoginRequest, RegisterRequest, User} from '@nilasoft/data';
import {Operation} from 'fast-json-patch';
import {AuthFeature, AuthState} from './auth.model';

const initialState: AuthState = {
  authorization: {},
  user: {}
};

export const authLoadRequest = createAction('auth/load/request');
export const authLoadSuccess = createAction('auth/load/success', payload<Authorization>());
export const authLoadFailure = createAction('auth/load/failure', error());

export const authLoginRequest = createAction('auth/login/request', payload<LoginRequest>());
export const authLoginSuccess = createAction('auth/login/success', payload<Authorization>());
export const authLoginFailure = createAction('auth/login/failure', error());

export const authRegisterRequest = createAction('auth/register/request', payload<RegisterRequest>());
export const authRegisterSuccess = createAction('auth/register/success', payload<Authorization>());
export const authRegisterFailure = createAction('auth/register/failure', error());

export const authLogoutRequest = createAction('auth/logout/request');
export const authLogoutSuccess = createAction('auth/logout/success');
export const authLogoutFailure = createAction('auth/logout/failure', error());

export const authFetchRequest = createAction('auth/fetch/request');
export const authFetchSuccess = createAction('auth/fetch/success', payload<User>());
export const authFetchFailure = createAction('auth/fetch/failure', error());

export const authUpdateRequest = createAction('auth/update/request', payload<Operation[]>());
export const authUpdateSuccess = createAction('auth/update/success', payload<User>());
export const authUpdateFailure = createAction('auth/update/failure', error());

export const authDeleteRequest = createAction('auth/delete/request');
export const authDeleteSuccess = createAction('auth/delete/success', payload<User>());
export const authDeleteFailure = createAction('auth/delete/failure', error());

export const authReducer = createReducer(
  initialState,
  on(authLoadRequest, request('authorization')),
  on(authLoadSuccess, success('authorization')),
  on(authLoadFailure, failure('authorization')),
  on(authLoginRequest, request('authorization')),
  on(authLoginSuccess, success('authorization')),
  on(authLoginFailure, failure('authorization')),
  on(authRegisterRequest, request('authorization')),
  on(authRegisterSuccess, success('authorization')),
  on(authRegisterFailure, failure('authorization')),
  on(authLogoutRequest, request('authorization')),
  on(authLogoutSuccess, success('authorization')),
  on(authLogoutFailure, failure('authorization')),
  on(authFetchRequest, request('user')),
  on(authFetchSuccess, success('user')),
  on(authFetchFailure, failure('user')),
  on(authUpdateRequest, request('user')),
  on(authUpdateSuccess, success('user')),
  on(authUpdateFailure, failure('user')),
  on(authDeleteRequest, request('user')),
  on(authDeleteSuccess, success('user')),
  on(authDeleteFailure, failure('user'))
);

export const selectAuthState = createFeatureSelector<AuthFeature, AuthState>('auth');

export const selectAuthAuthorization = createSelector(selectAuthState, auth => auth.authorization);

export const selectAuthUser = createSelector(selectAuthState, auth => auth.user);
