import { createReducer, on } from '@ngrx/store';
import { failure, reduce, request } from '@nilasoft/core';
import {
  getPushNotificationTokenFailure,
  getPushNotificationTokenRequest,
  getPushNotificationTokenSuccess
} from './push-notification.feature';
import { PushNotificationState } from './push-notification.model';

const initialState: PushNotificationState = {
  token: null,
  actions: {
    requestPermission: {},
    removeToken: {},
    refreshToken: {}
  }
};

export const pushNotificationReducer = createReducer(
  initialState,
  on(getPushNotificationTokenRequest, request('actions.requestPermission')),
  on(getPushNotificationTokenSuccess, reduce((state, action) => {
    state.actions.requestPermission.status = 'success';
    state.token = action.payload;
  })),
  on(getPushNotificationTokenFailure, failure('actions.requestPermission'))
);
