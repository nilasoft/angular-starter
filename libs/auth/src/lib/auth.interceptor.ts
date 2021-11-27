import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {first, map, switchMap} from 'rxjs/operators';
import {AUTH_CONFIG, AUTHORIZATION} from './auth.constant';
import {selectAuthAuthorization} from './auth.feature';
import {AuthConfig, AuthFeature} from './auth.model';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  public constructor(@Inject(AUTH_CONFIG)
                     private config: AuthConfig,
                     private store: Store<AuthFeature>) {
  }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.config.exclude.test(request.url))
      return next.handle(request);
    return this.store.select(selectAuthAuthorization)
      .pipe(
        first(),
        map(authorization => request.clone({
          setHeaders: {
            [AUTHORIZATION]: authorization.data?.authorization
          }
        })),
        switchMap(req => next.handle(req))
      );
  }

}
