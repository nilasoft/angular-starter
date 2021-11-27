import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import _ from 'lodash';
import {filter, first} from 'rxjs/operators';
import {AppState} from '../../app.model';
import {profileAddRequest, profileEditRequest, profileFetchRequest, selectProfileState} from './profile.feature';

@Component({
  selector: 'nilasoft-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public state = this.store.select(selectProfileState);

  public form: FormGroup;

  public constructor(private store: Store<AppState>,
                     private fb: FormBuilder) {
  }

  public ngOnInit(): void {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      avatar: [null, Validators.required]
    });
    this.state.pipe(filter(state => state.status === 'success' && !!state.data))
      .subscribe(state => this.form.patchValue(state.data));
    this.store.dispatch(profileFetchRequest());
  }

  public onSubmit(): void {
    this.state.pipe(first())
      .subscribe(state => {
        const value = _.assign({}, state.data, this.form.value);
        if (value.id)
          this.store.dispatch(profileEditRequest(value));
        else
          this.store.dispatch(profileAddRequest(value));
      });
  }

}
