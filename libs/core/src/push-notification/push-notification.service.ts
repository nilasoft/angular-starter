import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NotificationType, PushNotificationConstantModel } from './push-notification.model';
import moment from 'moment';
import _ from 'lodash';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { PushNotificationConstant } from './push-notification.constant';

// declare const fire;

@Injectable()
export class PushNotificationService {
  currentMessage = new BehaviorSubject(null);
  currentToken = new BehaviorSubject(null);
  messaging;

  constructor(
    @Inject(PushNotificationConstant)
    public config: PushNotificationConstantModel,
    private angularFireMessaging: AngularFireMessaging) {
    this.angularFireMessaging.messages.subscribe(
      (_messaging: AngularFireMessaging) => {
        _messaging.onMessage = _messaging.onMessage.bind(_messaging);
        _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
        _messaging.onBackgroundMessage = _messaging.onBackgroundMessage.bind(_messaging);
      }
    );


    this.init();

  }

  public init() {
    this.requestToken();
    this.permission();
    this.receiveMessage();
    this.receivedBackgroundMessage();
  }

  requestToken() {
    this.angularFireMessaging.requestToken.subscribe(_token => this.currentToken.next(_token));
  }

  permission(): void {
    this.angularFireMessaging.requestPermission.subscribe(_.noop);
  }

  getCurrentToken(): Observable<string> {
    return this.currentToken.asObservable();
  }

  receiveMessage() {

    this.angularFireMessaging.messages.subscribe(
      (payload) => {
        this.sendLocalMessage(payload);
        // this.currentMessage.next(payload);
      });
  }

  receivedBackgroundMessage(): void {
    // console.log('background message');
  }

  removeToken() {
    this.angularFireMessaging.deleteToken(this.currentToken.value);
  }

  onBackground() {
    // this.messaging.onBackgroundMessage((payload) => {
    //   console.log('[firebase-messaging-sw.js] Received background message ', payload);
    //   // Customize notification here
    //   const notificationTitle = 'Background Message Title';
    //   const notificationOptions = {
    //     body: 'Background Message body.',
    //     icon: '/firebase-logo.png'
    //   };
    //
    // });
  }

  sendLocalMessage(notification): void {
    const data = this.parse(notification);
    const notificationTitle = data.title;
    const notificationOptions = {
      body: data.message,
      icon: 'https://cdn.marcodapp.com/logo.jpg'
    };
    if (this.config.firebase.enable) {
      // tslint:disable-next-line:no-unused-expression
      new Notification(notificationTitle, notificationOptions);
    }
  }

  public parse(remoteMessage): any {
    const type: NotificationType = NotificationType[remoteMessage.data.type];
    const payload = JSON.parse(remoteMessage.data.payload);
    switch (type) {
      case NotificationType.Booking_Request:
        return {
          title: 'Reservation Request',
          message: `A New Reservation was requested for ${payload?.rentTitle}`,
          subText: moment().format('HH:mm')
        };
      case NotificationType.Booking_Canceled_By_Host:
        return {
          title: 'Reservation Canceled',
          message: `The reservation of ${payload?.rentTitle} canceled by the host`,
          subText: moment().format('HH:mm')
        };
      case NotificationType.Booking_Canceled_By_Customer:
        return {
          title: 'Reservation Canceled',
          message: `The reservation of ${payload?.rentTitle} canceled by the guest`,
          subText: moment().format('HH:mm')
        };
      case NotificationType.Booking_Approved:
        return {
          title: 'Reservation Approved',
          message: `Reservation request for ${payload?.rentTitle} was approved by the host`,
          subText: moment().format('HH:mm')
        };
      case NotificationType.Approved_Booking_Canceled_By_Host:
        return {
          title: 'Reservation Canceled',
          message: `The reservation of ${payload?.rentTitle} canceled by the host`,
          subText: moment().format('HH:mm')
        };
      case NotificationType.Approved_Booking_Canceled_By_Customer:
        return {
          title: 'Reservation Canceled',
          message: `The reservation of ${payload?.rentTitle} canceled by the guest`,
          subText: moment().format('HH:mm')
        };
      case NotificationType.Booking_Payed:
        return {
          title: 'Reservation Payed',
          message: `The reservation of ${payload?.rentTitle} was payed by the guest`,
          subText: moment().format('HH:mm')
        };
      case NotificationType.Payed_Booking_Canceled_By_Host_Free:
        return {
          title: 'Reservation Canceled',
          message: `The reservation of ${payload?.rentTitle} canceled by the host`,
          bigText: `The reservation of ${payload?.rentTitle} canceled by the host. the reservation fee was returned to your account.`,
          subText: moment().format('HH:mm')
        };
      case NotificationType.Payed_Booking_Canceled_By_Customer_Free:
        return {
          title: 'Reservation Canceled',
          message: `The reservation of ${payload?.rentTitle} canceled by the guest`,
          subText: moment().format('HH:mm')
        };
      // case NotificationType.Payed_Booking_Canceled_By_Host:
      //   return {
      //     title: 'Reservation Canceled',
      //     message: `The reservation of ${payload?.rentTitle} canceled by the host`,
      //     bigText:
      //     `The reservation of
      //     ${payload?.rentTitle} canceled by the host. ${payload?.amount}
      //     ${payload?.currency} was returned to your account`,
      //     subText: moment().format('HH:mm'),
      //     channelId: this.BookingChannel
      //   };

      case NotificationType.Payed_Booking_Canceled_By_Customer:
        return {
          title: 'Reservation Canceled',
          message: `The reservation of ${payload?.rentTitle} canceled by the guest`,
          bigText:
            `The reservation of ${payload?.rentTitle} canceled by the guest.
             ${payload?.penalty} ${payload?.currency} was credited to your account`,
          subText: moment().format('HH:mm')
        };
      case NotificationType.Host_Withdraw_Approved:
        return {
          title: 'Withdraw Approved',
          message: `Your ${payload?.amount} ${payload?.currency} withdrawal request has been approved`,
          subText: moment().format('HH:mm')
        };
      case NotificationType.Host_Withdraw_Canceled:
        return {
          title: 'Withdraw Canceled',
          message: `Your${payload?.amount} ${payload?.currency} withdrawal request has been declined`,
          subText: moment().format('HH:mm')
        };
      case NotificationType.Customer_Withdraw_Approved:
        return {
          title: 'Withdraw Approved',
          message: `Your ${payload?.amount} ${payload?.currency} withdrawal request has been approved`,
          subText: moment().format('HH:mm')
        };
      case NotificationType.Customer_Withdraw_Canceled:
        return {
          title: 'Withdraw Canceled',
          message: `Your ${payload?.amount} ${payload?.currency} withdrawal request has been declined`,
          subText: moment().format('HH:mm')
        };

      case NotificationType.Customer_Deposit_Approved:
        return {
          title: 'Deposit Approved',
          message: `Your ${payload?.amount} ${payload?.currency} deposit request has been approved`,
          subText: moment().format('HH:mm')
        };
      case NotificationType.Customer_Deposit_Canceled:
        return {
          title: 'Deposit Canceled',
          message: 'Your deposit request has been denied',
          subText: moment().format('HH:mm')
        };
      case NotificationType.Booking_Canceled_By_Admin:
        return {
          title: 'Reservation Canceled',
          message: `The booking request for ${payload?.rentTitle} was canceled by the admin`,
          bigText:
            payload?.finalAmount ?
              `The booking request for
              ${payload?.rentTitle} was canceled by the admin and
              ${payload?.penalty} ${payload.currency} was deposited to guest account and
              ${payload?.finalAmount} ${payload.currency} deposited to host account `
              : '',
          subText: moment().format('HH:mm')
        };
    }
  }

}
