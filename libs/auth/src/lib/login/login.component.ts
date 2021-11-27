import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import _ from 'lodash';
import {AUTH_CONFIG} from '../auth.constant';
import {authLoginRequest, selectAuthAuthorization} from '../auth.feature';
import {AuthConfig, AuthFeature} from '../auth.model';

@Component({
  selector: 'nilasoft-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public authorization = this.store.select(selectAuthAuthorization);

  public form: FormGroup;

  public constructor(@Inject(AUTH_CONFIG)
                     public config: AuthConfig,
                     private fb: FormBuilder,
                     private store: Store<AuthFeature>) {
  }

  public ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public async onSubmit(): Promise<void> {
    const value = _.assign({}, this.form.value);
    this.store.dispatch(authLoginRequest({
      username: value.username,
      password: value.password,
      captcha: null
    }));
  }

}
