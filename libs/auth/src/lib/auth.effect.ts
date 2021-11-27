import {Inject, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, exhaustMap, map, tap} from 'rxjs/operators';
import {AuthClient} from './auth.client';
import {AUTH_CONFIG} from './auth.constant';
import {
  authDeleteFailure,
  authDeleteRequest,
  authDeleteSuccess,
  authFetchFailure,
  authFetchRequest,
  authFetchSuccess,
  authLoadFailure,
  authLoadRequest,
  authLoadSuccess,
  authLoginFailure,
  authLoginRequest,
  authLoginSuccess,
  authLogoutFailure,
  authLogoutRequest,
  authLogoutSuccess,
  authRegisterFailure,
  authRegisterRequest,
  authRegisterSuccess,
  authUpdateFailure,
  authUpdateRequest,
  authUpdateSuccess
} from './auth.feature';
import {AuthConfig} from './auth.model';
import {AuthService} from './auth.service';

@Injectable()
export class AuthEffect {

  @Effect()
  public load = this.actions.pipe(
    ofType(authLoadRequest),
    exhaustMap(() => this.service.load().pipe(
      map(authLoadSuccess),
      catchError(err => of(authLoadFailure(err.message)))
    ))
  );

  @Effect()
  public login = this.actions.pipe(
    ofType(authLoginRequest),
    exhaustMap(action => this.client.login(action.payload).pipe(
      tap(auth => this.service.remember(auth)),
      map(authLoginSuccess),
      tap(() => this.router.navigate(['/'])),
      catchError(err => of(authLoginFailure(err.message)))
    ))
  );

  @Effect()
  public register = this.actions.pipe(
    ofType(authRegisterRequest),
    exhaustMap(action => this.client.register(action.payload).pipe(
      tap(auth => this.service.remember(auth)),
      map(authRegisterSuccess),
      tap(() => this.router.navigate(['/'])),
      catchError(err => of(authRegisterFailure(err.message)))
    ))
  );

  @Effect()
  public logout = this.actions.pipe(
    ofType(authLogoutRequest),
    exhaustMap(() => this.service.logout().pipe(
      map(authLogoutSuccess),
      tap(() => this.router.navigate([this.config.route.login])),
      catchError(err => of(authLogoutFailure(err.message)))
    ))
  );

  @Effect()
  public fetch = this.actions.pipe(
    ofType(authFetchRequest),
    exhaustMap(() => this.client.find().pipe(
      map(authFetchSuccess),
      catchError(err => of(authFetchFailure(err.message)))
    ))
  );

  @Effect()
  public update = this.actions.pipe(
    ofType(authUpdateRequest),
    exhaustMap(action => this.client.update(action.payload).pipe(
      map(authUpdateSuccess),
      catchError(err => of(authUpdateFailure(err.message)))
    ))
  );

  @Effect()
  public delete = this.actions.pipe(
    ofType(authDeleteRequest),
    exhaustMap(() => this.client.delete().pipe(
      map(authDeleteSuccess),
      catchError(err => of(authDeleteFailure(err.message)))
    ))
  );

  public constructor(@Inject(AUTH_CONFIG)
                     private config: AuthConfig,
                     private actions: Actions,
                     private client: AuthClient,
                     private service: AuthService,
                     private router: Router) {
  }

}
