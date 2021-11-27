import { ModuleWithProviders, NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { pushNotificationReducer } from './push-notification.reducer';
import { PushNotificationEffect } from './push-notification.effect';
import { PushNotificationService } from './push-notification.service';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireModule } from '@angular/fire';
import { PushNotificationConstantModel } from './push-notification.model';
import { PushNotificationConstant } from './push-notification.constant';
import { AngularFirestoreModule } from '@angular/fire/firestore';


@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature('pushNotification', pushNotificationReducer),
    EffectsModule.forFeature([PushNotificationEffect]),
    AngularFireMessagingModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp({
      databaseURL: 'https://marco-7cdcd.firebaseio.com',
      apiKey: 'AIzaSyB8kRl7L2FVcsxCPOqym4aGMhXPQPKi8oA',
      authDomain: 'marco-7cdcd.firebaseapp.com',
      projectId: 'marco-7cdcd',
      storageBucket: 'marco-7cdcd.appspot.com',
      messagingSenderId: '422549334793',
      appId: '1:422549334793:web:d216b1f796a4738fd3c1d8',
      measurementId: 'G-74EFHS3D8Y'
    })
  ],
  providers: [PushNotificationService]
})
export class PushNotificationModule {
  public static forRoot(config: PushNotificationConstantModel): ModuleWithProviders<PushNotificationModule> {
    return {
      ngModule: PushNotificationModule,
      providers: [
        PushNotificationService,
        { provide: PushNotificationConstant, useValue: config }
        // {
        //   provide: AngularFireRemoteConfig,
        //   useFactory: config.firebase
        // }
      ]
    };
  }
}
