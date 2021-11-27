import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, delay, exhaustMap, map, tap} from 'rxjs/operators';
import {UserClient} from './user.client';
import {
  userItemAddFailure,
  userItemAddRequest,
  userItemAddSuccess,
  userItemDeleteFailure,
  userItemDeleteRequest,
  userItemDeleteSuccess,
  userItemEditFailure,
  userItemEditRequest,
  userItemEditSuccess,
  userItemFetchFailure,
  userItemFetchRequest,
  userItemFetchSuccess,
  userListFetchFailure,
  userListFetchRequest,
  userListFetchSuccess
} from './user.feature';

@Injectable()
export class UserEffect {

  @Effect()
  public listFetch = this.actions.pipe(
    ofType(userListFetchRequest),
    exhaustMap(action => this.client.findPage(action.payload).pipe(
      delay(1000),
      map(userListFetchSuccess),
      catchError(err => of(userListFetchFailure(err.message)))
    ))
  );

  @Effect()
  public itemAdd = this.actions.pipe(
    ofType(userItemAddRequest),
    exhaustMap(action => this.client.create(action.payload).pipe(
      delay(1000),
      map(userItemAddSuccess),
      tap(() => this.router.navigate(['/users'])),
      catchError(err => of(userItemAddFailure(err.message)))
    ))
  );

  @Effect()
  public itemFetch = this.actions.pipe(
    ofType(userItemFetchRequest),
    exhaustMap(action => this.client.findById(action.payload).pipe(
      delay(1000),
      map(userItemFetchSuccess),
      catchError(err => of(userItemFetchFailure(err.message)))
    ))
  );

  @Effect()
  public itemEdit = this.actions.pipe(
    ofType(userItemEditRequest),
    exhaustMap(action => this.client.replaceById(action.payload.id, action.payload).pipe(
      delay(1000),
      map(userItemEditSuccess),
      tap(() => this.router.navigate(['/users'])),
      catchError(err => of(userItemEditFailure(err.message)))
    ))
  );

  @Effect()
  public itemDelete = this.actions.pipe(
    ofType(userItemDeleteRequest),
    exhaustMap(action => this.client.deleteById(action.payload).pipe(
      delay(1000),
      map(userItemDeleteSuccess),
      tap(() => this.router.navigate(['/users'])),
      catchError(err => of(userItemDeleteFailure(err.message)))
    ))
  );

  public constructor(private actions: Actions,
                     private client: UserClient,
                     private router: Router) {
  }

}
