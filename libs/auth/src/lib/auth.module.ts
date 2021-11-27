import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatToolbarModule} from '@angular/material/toolbar';
import {RouterModule} from '@angular/router';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import _ from 'lodash';
import {NgPipesModule} from 'ngx-pipes';
import {AuthClient} from './auth.client';
import {AUTH_CONFIG} from './auth.constant';
import {AuthEffect} from './auth.effect';
import {authReducer} from './auth.feature';
import {AuthGuard} from './auth.guard';
import {AuthInterceptor} from './auth.interceptor';
import {AuthConfig} from './auth.model';
import {AuthService} from './auth.service';
import {AuthComponent} from './auth/auth.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    NgPipesModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatToolbarModule,
    StoreModule.forFeature('auth', authReducer),
    EffectsModule.forFeature([AuthEffect]),
    RouterModule.forChild([
      {
        path: 'auth',
        component: AuthComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'login'
          },
          {
            path: 'login',
            component: LoginComponent
          },
          {
            path: 'register',
            component: RegisterComponent
          }
        ]
      }
    ])
  ],
  providers: [
    AuthClient,
    AuthService,
    AuthGuard,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ]
})
export class AuthModule {

  public static forRoot(config: AuthConfig): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [
        {
          provide: AUTH_CONFIG,
          useValue: _.merge({}, {
            exclude: /\/(assets|auth)\//,
            route: {
              login: '/auth/login',
              register: '/auth/register'
            }
          }, config)
        }
      ]
    };
  }

}
