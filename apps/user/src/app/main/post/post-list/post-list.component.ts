import {Component, OnInit} from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import {Store} from '@ngrx/store';
import {PostFilter} from '@nilasoft/data';
import _ from 'lodash';
import {AppState} from '../../../app.model';
import {postListFetchRequest, selectPostList} from '../post.feature';

@Component({
  selector: 'nilasoft-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  public list = this.store.select(selectPostList);

  private filter: Partial<PostFilter> = {};

  public constructor(private store: Store<AppState>) {
  }

  public ngOnInit(): void {
    this.fetch({size: 8});
  }

  public onSearch(element: HTMLInputElement): void {
    this.fetch({search: element.value});
  }

  public onPage(event: PageEvent): void {
    this.fetch({
      size: event.pageSize,
      page: event.pageIndex
    });
  }

  private fetch(filter: Partial<PostFilter>): void {
    this.filter = _.assign({}, this.filter, filter);
    this.store.dispatch(postListFetchRequest(this.filter));
  }

}
