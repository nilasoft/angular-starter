import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import _ from 'lodash';
import {AUTH_CONFIG} from '../auth.constant';
import {authRegisterRequest, selectAuthAuthorization} from '../auth.feature';
import {AuthConfig, AuthFeature} from '../auth.model';

@Component({
  selector: 'nilasoft-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

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
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  public onSubmit(): void {
    const value = _.assign({}, this.form.value);
    this.store.dispatch(authRegisterRequest({
      email: value.email,
      username: value.username,
      password: value.password,
      captcha: null
    }));
  }

}
