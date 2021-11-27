import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, delay, exhaustMap, map} from 'rxjs/operators';
import {ProfileClient} from './profile.client';
import {
  profileAddFailure,
  profileAddRequest,
  profileAddSuccess,
  profileEditFailure,
  profileEditRequest,
  profileEditSuccess,
  profileFetchFailure,
  profileFetchRequest,
  profileFetchSuccess
} from './profile.feature';

@Injectable()
export class ProfileEffect {

  @Effect()
  public fetch = this.actions.pipe(
    ofType(profileFetchRequest),
    exhaustMap(() => this.client.findOne().pipe(
      delay(1000),
      map(profileFetchSuccess),
      catchError(err => of(profileFetchFailure(err.message)))
    ))
  );

  @Effect()
  public add = this.actions.pipe(
    ofType(profileAddRequest),
    exhaustMap(action => this.client.create(action.payload).pipe(
      delay(1000),
      map(profileAddSuccess),
      catchError(err => of(profileAddFailure(err.message)))
    ))
  );

  @Effect()
  public edit = this.actions.pipe(
    ofType(profileEditRequest),
    exhaustMap(action => this.client.replaceById(action.payload.id, action.payload).pipe(
      delay(1000),
      map(profileEditSuccess),
      catchError(err => of(profileEditFailure(err.message)))
    ))
  );

  public constructor(private actions: Actions,
                     private client: ProfileClient) {
  }

}
