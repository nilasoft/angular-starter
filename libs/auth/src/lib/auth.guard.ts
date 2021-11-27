import {Inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AUTH_CONFIG} from './auth.constant';
import {AuthConfig} from './auth.model';
import {AuthService} from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  public constructor(@Inject(AUTH_CONFIG)
                     private config: AuthConfig,
                     private router: Router,
                     private service: AuthService) {
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.service.authorized()
      .pipe(map(active => active || this.router.createUrlTree([this.config.route.login])));
  }

}
