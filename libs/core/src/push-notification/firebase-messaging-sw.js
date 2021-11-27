/**
 * in file bayad dar root project qarar begirad
 * hamchenin noskheE ke estefade mishavad bayad ba noskhe mojod dar package.json yeki bashad
 *
 * baraye handle kardan background message dar in file eqdam mikonim
 */

importScripts('https://www.gstatic.com/firebasejs/8.9.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.9.1/firebase-messaging.js');

// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  databaseURL: 'https://marco-7cdcd.firebaseio.com',
  apiKey: "AIzaSyB8kRl7L2FVcsxCPOqym4aGMhXPQPKi8oA",
  authDomain: "marco-7cdcd.firebaseapp.com",
  projectId: "marco-7cdcd",
  storageBucket: "marco-7cdcd.appspot.com",
  messagingSenderId: "422549334793",
  appId: "1:422549334793:web:d216b1f796a4738fd3c1d8",
  measurementId: "G-74EFHS3D8Y"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
//
messaging.onBackgroundMessage((payload) => {
  const message = pars(payload)
  const notificationTitle = message.title;
  const notificationOptions = {
    body: message.message,
    icon: 'https://cdn.marcodapp.com/logo.jpg'
  }




  self.registration.showNotification(notificationTitle,
    notificationOptions);
});

function pars(remoteMessage) {
  const type = remoteMessage.data.type;
  const payload = JSON.parse(remoteMessage.data.payload);
  switch (type) {
    case "Booking_Request":
      return {
        title: 'Reservation Request',
        message: `A New Reservation was requested for ${payload?.rentTitle}`,
      };
    case "Booking_Canceled_By_Host":
      return {
        title: 'Reservation Canceled',
        message: `The reservation of ${payload?.rentTitle} canceled by the host`,
      };
    case "Booking_Canceled_By_Customer":
      return {
        title: 'Reservation Canceled',
        message: `The reservation of ${payload?.rentTitle} canceled by the guest`,
      };
    case "Booking_Approved":
      return {
        title: 'Reservation Approved',
        message: `Reservation request for ${payload?.rentTitle} was approved by the host`,
      };
    case "Approved_Booking_Canceled_By_Host":
      return {
        title: 'Reservation Canceled',
        message: `The reservation of ${payload?.rentTitle} canceled by the host`,
      };
    case "Approved_Booking_Canceled_By_Customer":
      return {
        title: 'Reservation Canceled',
        message: `The reservation of ${payload?.rentTitle} canceled by the guest`,
      };
    case "Booking_Payed":
      return {
        title: 'Reservation Payed',
        message: `The reservation of ${payload?.rentTitle} was payed by the guest`,
      };
    case "Payed_Booking_Canceled_By_Host_Free":
      return {
        title: 'Reservation Canceled',
        message: `The reservation of ${payload?.rentTitle} canceled by the host`,
        bigText: `The reservation of ${payload?.rentTitle} canceled by the host. the reservation fee was returned to your account.`,
      };
    case "Payed_Booking_Canceled_By_Customer_Free":
      return {
        title: 'Reservation Canceled',
        message: `The reservation of ${payload?.rentTitle} canceled by the guest`,
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

    case "Payed_Booking_Canceled_By_Customer":
      return {
        title: 'Reservation Canceled',
        message: `The reservation of ${payload?.rentTitle} canceled by the guest`,
        bigText:
          `The reservation of ${payload?.rentTitle} canceled by the guest.
             ${payload?.penalty} ${payload?.currency} was credited to your account`,
      };
    case "Host_Withdraw_Approved":
      return {
        title: 'Withdraw Approved',
        message: `Your ${payload?.amount} ${payload?.currency} withdrawal request has been approved`,
      };
    case "Host_Withdraw_Canceled":
      return {
        title: 'Withdraw Canceled',
        message: `Your${payload?.amount} ${payload?.currency} withdrawal request has been declined`,
      };
    case "Customer_Withdraw_Approved":
      return {
        title: 'Withdraw Approved',
        message: `Your ${payload?.amount} ${payload?.currency} withdrawal request has been approved`,
      };
    case "Customer_Withdraw_Canceled":
      return {
        title: 'Withdraw Canceled',
        message: `Your ${payload?.amount} ${payload?.currency} withdrawal request has been declined`,
      };

    case "Customer_Deposit_Approved":
      return {
        title: 'Deposit Approved',
        message: `Your ${payload?.amount} ${payload?.currency} deposit request has been approved`,
      };
    case "Customer_Deposit_Canceled":
      return {
        title: 'Deposit Canceled',
        message: 'Your deposit request has been denied',
      };
    case "Booking_Canceled_By_Admin":
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
      };
  }
}
