import { InjectionToken } from '@angular/core';
import { PushNotificationConstantModel } from './push-notification.model';

export const PushNotificationConstant = new InjectionToken<PushNotificationConstantModel>('__notification_config__');
