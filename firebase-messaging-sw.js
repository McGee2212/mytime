importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js');
firebase.initializeApp({
  apiKey: "AIzaSyB33LGC5T6JmmhyRTvZt_ve6Vm-_thB0vE",
  authDomain: "all-shit-for-my-dream.firebaseapp.com",
  projectId: "all-shit-for-my-dream",
  storageBucket: "all-shit-for-my-dream.appspot.com",
  messagingSenderId: "559865883468",
  appId: "1:559865883468:web:aeb1677d8e8b6884d63de9"
});
const messaging = firebase.messaging();
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Nachricht empfangen: ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/icon-192.png'
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});