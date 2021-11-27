import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Authorization, UserStatus} from '@nilasoft/data';
import {Observable, of, throwError} from 'rxjs';
import {find, map} from 'rxjs/operators';
import {AuthClient} from './auth.client';
import {AUTHORIZATION} from './auth.constant';
import {authFetchRequest, selectAuthUser} from './auth.feature';
import {AuthFeature} from './auth.model';

@Injectable()
export class AuthService {

  public constructor(private client: AuthClient,
                     private store: Store<AuthFeature>) {
  }

  public load(): Observable<Authorization> {
    const str = localStorage.getItem(AUTHORIZATION);
    if (str) {
      const authorization = JSON.parse(str);
      return of(authorization);
    } else {
      const error = new Error('authorization not found');
      return throwError(error);
    }
  }

  public remember(authorization: Authorization): Observable<boolean> {
    const str = JSON.stringify(authorization);
    localStorage.setItem(AUTHORIZATION, str);
    return of(true);
  }

  public logout(): Observable<boolean> {
    localStorage.removeItem(AUTHORIZATION);
    return of(true);
  }

  public authorized(): Observable<boolean> {
    this.store.dispatch(authFetchRequest());
    return this.store.select(selectAuthUser)
      .pipe(
        find(user => user.status && user.status !== 'request'),
        map(user => user.data?.status === UserStatus.ACTIVE)
      );
  }

}
