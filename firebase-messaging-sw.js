importScripts("https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyC6Yc6dIIYA5aTnEyU-6IjlMNSibmlSNiE",
  authDomain: "ihsa-fitness-app.firebaseapp.com",
  databaseURL: "https://ihsa-fitness-app-default-rtdb.firebaseio.com",
  projectId: "ihsa-fitness-app",
  storageBucket: "ihsa-fitness-app.firebasestorage.app",
  messagingSenderId: "718264416647",
  appId: "1:718264416647:web:ca6a667e4c7c07c55b7b22"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notification = payload.notification || {};
  self.registration.showNotification(notification.title || "Aggie IHSA Fitness", {
    body: notification.body || "You have a new team update.",
    icon: "/AggieIHSALogo.webp",
    data: { url: "https://ldenker2006-svg.github.io/" }
  });
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data?.url || "https://ldenker2006-svg.github.io/"));
});
