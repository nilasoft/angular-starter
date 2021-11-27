import {Component, OnInit} from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import {Store} from '@ngrx/store';
import {Pageable} from '@nilasoft/data';
import {AppState} from '../../../app.model';
import {selectUserList, userListFetchRequest} from '../user.feature';

@Component({
  selector: 'nilasoft-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  public readonly columns = ['id', 'username', 'role', 'status', 'actions'];

  public list = this.store.select(selectUserList);

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
    this.store.dispatch(userListFetchRequest(pageable));
  }

}
