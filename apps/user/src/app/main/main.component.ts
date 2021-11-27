import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {authLogoutRequest, selectAuthUser} from '@nilasoft/auth';
import {AppState} from '../app.model';

@Component({
  selector: 'nilasoft-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public readonly list: ListItem[] = [
    {
      path: '/home',
      icon: 'home',
      title: 'Home'
    },
    {
      path: '/posts',
      icon: 'folder',
      title: 'Posts'
    },
    {
      path: '/profile',
      icon: 'person',
      title: 'Profile'
    }
  ];

  public user = this.store.select(selectAuthUser);

  public constructor(private store: Store<AppState>) {
  }

  public ngOnInit(): void {
  }

  public onLogout(): void {
    this.store.dispatch(authLogoutRequest());
  }

}

export interface ListItem {

  path: string;

  icon: string;

  title: string;

}
