importScripts(
  'https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js'
)
importScripts(
  'https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js'
)

firebase.initializeApp({
  apiKey: 'AIzaSyDRjL2bG-DnSkk2r664NtScPkqX6CNxatw',
  authDomain: 'test-pwa-d51a4.firebaseapp.com',
  projectId: 'test-pwa-d51a4',
  storageBucket: 'test-pwa-d51a4.firebasestorage.app',
  messagingSenderId: '769749607138',
  appId: '1:769749607138:web:6badde27a31a69c9f6b4bb'
})

const messaging = firebase.messaging()

messaging.onBackgroundMessage(payload => {
  console.log('Messaggio ricevuto in background:', payload)

  const notificationTitle = payload.notification.title
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/assets/icons/icon-192x192.png',
    badge: '/assets/icons/badge-72x72.png',
    data: payload.data
  }

  self.registration.showNotification(notificationTitle, notificationOptions)
})
