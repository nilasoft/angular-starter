import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { GoogleAnalyticsService } from './google-analytics.service';
import { ActionEvent, CategoryEvent } from './analytics.model';

@Injectable({providedIn: 'root'})
export class TrackerService {
  constructor(private router: Router,
              private service: GoogleAnalyticsService
              ) {

  }

  pageEvent() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.service.emitEvent(CategoryEvent.PAGE, ActionEvent.VIEW, event.urlAfterRedirects);
      });
  }


}

