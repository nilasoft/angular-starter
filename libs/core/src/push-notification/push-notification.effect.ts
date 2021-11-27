import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { PushNotificationService } from './push-notification.service';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import {
  getPushNotificationTokenFailure,
  getPushNotificationTokenRequest,
  getPushNotificationTokenSuccess
} from './push-notification.feature';
import { of } from 'rxjs';

@Injectable()
export class PushNotificationEffect {

  @Effect()
  public hostLoad = this.actions.pipe(
    ofType(getPushNotificationTokenRequest),
    exhaustMap(() => this.service.getCurrentToken().pipe(
      map(getPushNotificationTokenSuccess),
      catchError(err => of(getPushNotificationTokenFailure(err)))
    ))
  );

  public constructor(private actions: Actions,
                     private service: PushNotificationService) {
  }

}
