import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {ItemMode, selectRouterItemMode, selectRouterRouteParam} from '@nilasoft/core';
import _ from 'lodash';
import {zip} from 'rxjs';
import {filter, first, map} from 'rxjs/operators';
import {AppState} from '../../../app.model';
import {
  selectUserItem,
  userItemAddRequest,
  userItemDeleteRequest,
  userItemEditRequest,
  userItemFetchRequest,
  userItemFetchSuccess
} from '../user.feature';

@Component({
  selector: 'nilasoft-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss']
})
export class UserItemComponent implements OnInit {

  public mode = this.store.select(selectRouterItemMode);

  public id = this.store.pipe(
    select(selectRouterRouteParam('id')),
    map(parseInt)
  );

  public item = this.store.select(selectUserItem);

  public form: FormGroup;

  public constructor(private store: Store<AppState>,
                     private fb: FormBuilder) {
  }

  public ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required],
      status: ['', Validators.required]
    });
    this.item.pipe(filter(item => item.status === 'success' && !!item.data))
      .subscribe(item => this.form.patchValue(item.data));
    zip(this.mode, this.id)
      .pipe(first())
      .subscribe(([mode, id]) => {
        if (mode === ItemMode.ADD)
          this.store.dispatch(userItemFetchSuccess(null));
        else
          this.store.dispatch(userItemFetchRequest(id));
      });
  }

  public onSubmit(): void {
    zip(this.mode, this.id, this.item)
      .pipe(first())
      .subscribe(([mode, id, item]) => {
        const value = _.assign({}, item?.data, this.form.value);
        switch (mode) {
          case ItemMode.ADD:
            this.store.dispatch(userItemAddRequest(value));
            break;
          case ItemMode.EDIT:
            this.store.dispatch(userItemEditRequest(value));
            break;
          case ItemMode.DELETE:
            this.store.dispatch(userItemDeleteRequest(id));
            break;
        }
      });
  }

}
