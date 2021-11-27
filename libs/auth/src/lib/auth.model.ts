import {AsyncState} from '@nilasoft/core';
import {Authorization, Role, User} from '@nilasoft/data';

export interface AuthFeature {

  auth: AuthState;

}

export interface AuthState {

  authorization: AsyncState<Authorization>;

  user: AsyncState<User>;

}

export interface AuthConfig {

  role: Role;

  exclude?: RegExp;

  route?: {

    login?: string;

    register?: string;

  };

}
