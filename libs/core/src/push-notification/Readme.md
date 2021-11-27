# Push notification

This feature is for push notification in ngrx or you can use in 
simple project



🔎 **Attention to this things**

1- Add **firebase-messaging-sw.js** to root of your project
  move form this directory to root if project

2- Add manifest.json to your project and link it in index.html
for get notification you must set **gcm_sender_id** in this file 

3- BackgroundMessage are handled in **firebase-messaging-sw.js** file 
and for foregroundMessage you should use notification service
