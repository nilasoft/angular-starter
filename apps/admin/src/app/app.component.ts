import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {TranslateService} from '@ngx-translate/core';
import {authLoadRequest} from '@nilasoft/auth';
import {AppState} from './app.model';

@Component({
  selector: 'nilasoft-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public constructor(private store: Store<AppState>,
                     private translateService: TranslateService) {
  }

  public ngOnInit(): void {
    this.store.dispatch(authLoadRequest());
    this.translateService.use('en');
  }

}
