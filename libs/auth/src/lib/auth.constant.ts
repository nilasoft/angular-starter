import {InjectionToken} from '@angular/core';
import {AuthConfig} from './auth.model';

export const AUTH_CONFIG = new InjectionToken<AuthConfig>('__auth_config__');

export const AUTHORIZATION = 'Authorization';
