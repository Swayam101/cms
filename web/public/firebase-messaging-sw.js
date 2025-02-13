// importScripts("https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js");
// importScripts(
//   "https://www.gstatic.com/firebasejs/10.5.0/firebase-messaging.js"
// );
importScripts(
  "https://www.gstatic.com/firebasejs/10.1.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.1.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyCmXEj77qIrCdJfAwlNSGjoylnDXDrgghA",
  authDomain: "swysh-7a188.firebaseapp.com",
  projectId: "swysh-7a188",
  storageBucket: "swysh-7a188.appspot.com",
  messagingSenderId: "672738389135",
  appId: "1:672738389135:web:c5aa5fcabd9a50671454fa",
  measurementId: "G-02Q7H4CT04",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle =
    payload.notification?.title || "Background Notification";
  const notificationOptions = {
    body: payload.notification?.body || "This is a background message.",
  };

  new Notification(notificationTitle, notificationOptions);
});
