import { createAction } from '@ngrx/store';
import { error, payload } from '@nilasoft/core';

export const getPushNotificationTokenRequest = createAction('push-notification/permission/request', payload());
export const getPushNotificationTokenSuccess = createAction('push-notification/permission/success', payload<string>());
export const getPushNotificationTokenFailure = createAction('push-notification/permission/failure', error());
