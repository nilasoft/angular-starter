import {AuthFeature} from '@nilasoft/auth';
import {BaseState} from '@nilasoft/core';
import {UserState} from './main/user/user.model';

export interface AppState extends BaseState, AuthFeature {

  user: UserState;

}
