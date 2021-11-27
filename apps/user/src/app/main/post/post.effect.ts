import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, delay, exhaustMap, map} from 'rxjs/operators';
import {PostClient} from './post.client';
import {postListFetchFailure, postListFetchRequest, postListFetchSuccess} from './post.feature';

@Injectable()
export class PostEffect {

  @Effect()
  public listFetch = this.actions.pipe(
    ofType(postListFetchRequest),
    exhaustMap(action => this.client.filter(action.payload).pipe(
      delay(1000),
      map(postListFetchSuccess),
      catchError(err => of(postListFetchFailure(err.message)))
    ))
  );

  public constructor(private actions: Actions,
                     private client: PostClient) {
  }

}
