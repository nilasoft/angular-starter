import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../app.model';

@Component({
  selector: 'nilasoft-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public state = this.store.select(state => state);

  public constructor(private store: Store<AppState>) {
  }

  public ngOnInit(): void {
  }

}
