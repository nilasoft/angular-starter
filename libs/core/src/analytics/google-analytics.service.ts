import { Inject, Injectable } from '@angular/core';
import { ActionEvent, CategoryEvent, AnalyticsModel, Track } from './analytics.model';
import _ from 'lodash';
import { AnalyticsConstant } from './analytics.constant';

declare let ga: Function;


@Injectable()
export class GoogleAnalyticsService {

  constructor(@Inject(AnalyticsConstant)
              public config: AnalyticsModel) {
  }

  public emitEvent(category: CategoryEvent,
                   action: ActionEvent,
                   label: string = null,
                   value: number = null) {
    const data: Track = _.assign({}, {
      category: category,
      action: action,
      label: label,
      value: value
    });
    this.track(data);
  }

  protected track(event: Track) {
    if (this.config.enable) {
      ga('set', 'page', event.label);
      ga('send', 'event', event.category, event.action, event.value);
    }
  }
}
