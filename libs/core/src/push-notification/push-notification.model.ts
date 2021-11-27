import { AsyncState } from '@nilasoft/core';

export interface PushNotificationFeature {

  pushNotification: PushNotificationState;

}

export interface PushNotificationState {
  token: string;
  actions: {
    requestPermission: AsyncState<boolean>
    removeToken: AsyncState<void>;
    refreshToken: AsyncState<void>;
  }

}


export enum NotificationType {
  Booking_Request = 'Booking_Request',
  Booking_Canceled_By_Host = 'Booking_Canceled_By_Host',
  Booking_Canceled_By_Customer = 'Booking_Canceled_By_Customer',
  Booking_Approved = 'Booking_Approved',
  Approved_Booking_Canceled_By_Host = 'Approved_Booking_Canceled_By_Host',
  Approved_Booking_Canceled_By_Customer = 'Approved_Booking_Canceled_By_Customer',
  Booking_Payed = 'Booking_Payed',
  Payed_Booking_Canceled_By_Host_Free = 'Payed_Booking_Canceled_By_Host_Free',
  Payed_Booking_Canceled_By_Customer_Free = 'Payed_Booking_Canceled_By_Customer_Free',
  Payed_Booking_Canceled_By_Host = 'Payed_Booking_Canceled_By_Host',
  Payed_Booking_Canceled_By_Customer = 'Payed_Booking_Canceled_By_Customer',
  Host_Withdraw_Approved = 'Host_Withdraw_Approved',
  Host_Withdraw_Canceled = 'Host_Withdraw_Canceled',
  Customer_Withdraw_Approved = 'Customer_Withdraw_Approved',
  Customer_Withdraw_Canceled = 'Customer_Withdraw_Canceled',
  Customer_Deposit_Approved = 'Customer_Deposit_Approved',
  Customer_Deposit_Canceled = 'Customer_Deposit_Canceled',
  Booking_Canceled_By_Admin = 'Booking_Canceled_By_Admin'
}

export interface PushNotificationConstantModel {
  firebase: Firebase
}

export interface Firebase {
  enable: boolean,
  config: FirebaseConfig
}

export interface FirebaseConfig {
  apiKey: string,
  authDomain: string,
  projectId: string,
  storageBucket: string,
  messagingSenderId: string,
  appId: string,
  measurementId: string
}
