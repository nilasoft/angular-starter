import {RouterReducerState} from '@ngrx/router-store';

export type AsyncStatus = 'request' | 'cancel' | 'success' | 'failure';

export interface Message {

  key: string;

  params: Record<string, any>;

}

export interface AsyncState<T = never, S = AsyncStatus, E = Message> {

  status?: S;

  data?: T;

  error?: E;

}

export enum ItemMode {

  ADD = 'ADD',

  SHOW = 'SHOW',

  EDIT = 'EDIT',

  DELETE = 'DELETE'

}

export interface BaseState {

  router: RouterReducerState;

}
