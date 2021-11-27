import {Component, OnInit} from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import {Store} from '@ngrx/store';
import {Pageable} from '@nilasoft/data';
import {AppState} from '../../../app.model';
import {postListFetchRequest, selectPostList} from '../post.feature';

@Component({
  selector: 'nilasoft-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  public readonly columns = ['id', 'title', 'actions'];

  public list = this.store.select(selectPostList);

  public constructor(private store: Store<AppState>) {
  }

  public ngOnInit(): void {
    this.fetch({size: 8});
  }

  public onPage(event: PageEvent): void {
    this.fetch({
      size: event.pageSize,
      page: event.pageIndex
    });
  }

  private fetch(pageable: Partial<Pageable>): void {
    this.store.dispatch(postListFetchRequest(pageable));
  }

}
