import { Inject, Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
// import { GoogleTagManagerService as googleService } from 'angular-google-tag-manager';
import { ActionEvent, CategoryEvent, EventType, AnalyticsModel, TrackEvent } from './analytics.model';
// import { LoggerService } from '@nilasoft/core';
import { filter } from 'rxjs/operators';
import { AnalyticsConstant } from './analytics.constant';


@Injectable()
export class GoogleTagManagerService {

  constructor(
    @Inject(AnalyticsConstant)
    public config: AnalyticsModel,
    private router: Router,
    // private gtmService: googleService,
    // private loggerService: LoggerService
  ) {
  }


  pageEvent() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const val = this.creatTrackObject(CategoryEvent.PAGE, ActionEvent.VIEW, event.url, {})
        this.pushTag(val);
      });
  }

  creatTrackObject(category: CategoryEvent, action: ActionEvent, label: string, value: any): TrackEvent {
    return {
      event: EventType.CustomEvent,
      eventInfo: {
        category,
        action,
        label,
        value
      }
    }
  }

  pushTag(event: TrackEvent) {
    if (!this.config.enable) return;
    // this.gtmService.pushTag(event);
    // this.loggerService.successLog(event);

  }

  getDatalayer() {
    if (!this.config.enable) return;
    // return this.gtmService.getDataLayer();
  }

}
