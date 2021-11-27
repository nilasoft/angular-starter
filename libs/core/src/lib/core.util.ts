import {HttpParams} from '@angular/common/http';
import {ActionCreator, ActionType} from '@ngrx/store';
import {OnReducer} from '@ngrx/store/src/reducer_creator';
import produce, {Draft} from 'immer';
import _, {PropertyPath} from 'lodash';
import {Message} from './core.model';

export function toParams(map: object): HttpParams {
  return _.entries(map)
    .map(([k, v]) => _.isArray(v) ? [k, v] : [k, [v]])
    .reduce((prev, [k, v]: [string, any[]]) => [...prev, ...v.map(i => [k, i])], [])
    .filter(([, v]) => v !== undefined && v !== null)
    .map(([k, v]) => [k, String(v)])
    .reduce((prev, [k, v]) => prev.append(k, v), new HttpParams());
}

export function payload<P = void>(): (p: P) => { payload: P; } {
  return p => ({payload: p});
}

export function error(): (key: string, params?: Record<string, any>) => { error: Message; } {
  return (key, params) => ({error: {key, params}});
}

export function reduce<S, C extends ActionCreator>(
  reducer: (state: Draft<S>, action: ActionType<C>) => void | S | Draft<S>
): OnReducer<S, [C]> {
  return (state, action) => {
    const result = produce(state, draft => reducer(draft, action));
    return result as S;
  };
}

export function request<S, C extends ActionCreator>(path?: PropertyPath): OnReducer<S, [C]> {
  return reduce(state => {
    state = path ? _.get(state, path) : state;
    state['status'] = 'request';
    state['error'] = null;
  });
}

export function success<S, C extends ActionCreator>(path?: PropertyPath): OnReducer<S, [C]> {
  return reduce((state, action) => {
    state = path ? _.get(state, path) : state;
    state['status'] = 'success';
    state['data'] = action['payload'];
  });
}

export function failure<S, C extends ActionCreator>(path?: PropertyPath): OnReducer<S, [C]> {
  return reduce((state, action) => {
    state = path ? _.get(state, path) : state;
    state['status'] = 'failure';
    state['error'] = action['error'];
  });
}
