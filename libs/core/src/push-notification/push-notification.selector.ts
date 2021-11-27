import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PushNotificationFeature, PushNotificationState } from './push-notification.model';

export const selectPushNotificationState =
  createFeatureSelector<PushNotificationFeature, PushNotificationState>('pushNotification');

export const selectPushNotificationToken = createSelector(selectPushNotificationState, state => state.token);

export const selectPushNotificationActions = createSelector(selectPushNotificationState, state => state.actions);
