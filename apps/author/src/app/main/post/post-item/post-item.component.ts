import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {ItemMode, selectRouterItemMode, selectRouterRouteParam} from '@nilasoft/core';
import _ from 'lodash';
import {zip} from 'rxjs';
import {filter, first, map} from 'rxjs/operators';
import {AppState} from '../../../app.model';
import {
  postItemAddRequest,
  postItemDeleteRequest,
  postItemEditRequest,
  postItemFetchRequest,
  postItemFetchSuccess,
  selectPostItem
} from '../post.feature';

@Component({
  selector: 'nilasoft-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss']
})
export class PostItemComponent implements OnInit {

  public mode = this.store.select(selectRouterItemMode);

  public id = this.store.pipe(
    select(selectRouterRouteParam('id')),
    map(parseInt)
  );

  public item = this.store.select(selectPostItem);

  public form: FormGroup;

  public constructor(private store: Store<AppState>,
                     private fb: FormBuilder) {
  }

  public ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required]
    });
    zip(this.mode, this.id)
      .pipe(first())
      .subscribe(([mode, id]) => {
        if (mode === ItemMode.ADD) {
          this.store.dispatch(postItemFetchSuccess(null));
        } else {
          this.item.pipe(filter(item => item.status === 'success' && !!item.data))
            .subscribe(item => this.form.patchValue(item.data));
          this.store.dispatch(postItemFetchRequest(id));
        }
      });
  }

  public onSubmit(): void {
    zip(this.mode, this.id, this.item)
      .pipe(first())
      .subscribe(([mode, id, item]) => {
        const value = _.assign({}, item?.data, this.form.value);
        switch (mode) {
          case ItemMode.ADD:
            this.store.dispatch(postItemAddRequest(value));
            break;
          case ItemMode.EDIT:
            this.store.dispatch(postItemEditRequest(value));
            break;
          case ItemMode.DELETE:
            this.store.dispatch(postItemDeleteRequest(id));
            break;
        }
      });
  }

}
