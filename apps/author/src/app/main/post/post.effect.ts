import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, delay, exhaustMap, map, tap} from 'rxjs/operators';
import {PostClient} from './post.client';
import {
  postItemAddFailure,
  postItemAddRequest,
  postItemAddSuccess,
  postItemDeleteFailure,
  postItemDeleteRequest,
  postItemDeleteSuccess,
  postItemEditFailure,
  postItemEditRequest,
  postItemEditSuccess,
  postItemFetchFailure,
  postItemFetchRequest,
  postItemFetchSuccess,
  postListFetchFailure,
  postListFetchRequest,
  postListFetchSuccess
} from './post.feature';

@Injectable()
export class PostEffect {

  @Effect()
  public listFetch = this.actions.pipe(
    ofType(postListFetchRequest),
    exhaustMap(action => this.client.findPage(action.payload).pipe(
      delay(1000),
      map(postListFetchSuccess),
      catchError(err => of(postListFetchFailure(err.message)))
    ))
  );

  @Effect()
  public itemAdd = this.actions.pipe(
    ofType(postItemAddRequest),
    exhaustMap(action => this.client.create(action.payload).pipe(
      delay(1000),
      map(postItemAddSuccess),
      tap(() => this.router.navigate(['/posts'])),
      catchError(err => of(postItemAddFailure(err.message)))
    ))
  );

  @Effect()
  public itemFetch = this.actions.pipe(
    ofType(postItemFetchRequest),
    exhaustMap(action => this.client.findById(action.payload).pipe(
      delay(1000),
      map(postItemFetchSuccess),
      catchError(err => of(postItemFetchFailure(err.message)))
    ))
  );

  @Effect()
  public itemEdit = this.actions.pipe(
    ofType(postItemEditRequest),
    exhaustMap(action => this.client.replaceById(action.payload.id, action.payload).pipe(
      delay(1000),
      map(postItemEditSuccess),
      tap(() => this.router.navigate(['/posts'])),
      catchError(err => of(postItemEditFailure(err.message)))
    ))
  );

  @Effect()
  public itemDelete = this.actions.pipe(
    ofType(postItemDeleteRequest),
    exhaustMap(action => this.client.deleteById(action.payload).pipe(
      delay(1000),
      map(postItemDeleteSuccess),
      tap(() => this.router.navigate(['/posts'])),
      catchError(err => of(postItemDeleteFailure(err.message)))
    ))
  );

  public constructor(private actions: Actions,
                     private client: PostClient,
                     private router: Router) {
  }

}
