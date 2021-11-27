import { InjectionToken } from '@angular/core';
import { AnalyticsModel } from './analytics.model';

export const AnalyticsConstant = new InjectionToken<AnalyticsModel>('__analytics_config__');
