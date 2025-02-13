import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCmXEj77qIrCdJfAwlNSGjoylnDXDrgghA",
  authDomain: "swysh-7a188.firebaseapp.com",
  projectId: "swysh-7a188",
  storageBucket: "swysh-7a188.appspot.com",
  messagingSenderId: "672738389135",
  appId: "1:672738389135:web:c5aa5fcabd9a50671454fa",
  measurementId: "G-02Q7H4CT04",
};

const app = initializeApp(firebaseConfig);

const intializeNotifications = async () => {
  try {
    if (!("serviceWorker" in navigator)) {
      console.error("Service workers are not supported in this browser.");
      return;
    }

    if (!("Notification" in window)) {
      console.error("Notifications are not supported in this browser.");
      return;
    }
    const messaging = getMessaging(app);
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.log("Notification permission denied.");
      return;
    }

    const registration = await navigator.serviceWorker.register(
      "/firebase-messaging-sw.js"
    );
    const token = await getToken(messaging, {
      vapidKey:
        "BBXi827iTxkwkc9tkIweFLtVf6ZtRzjiBHXU-Mh1dhdoDJOHo_S6tqfASZ_hnAvL8b9ep4ufBEJnD1EFXUJ0wzQ",
      serviceWorkerRegistration: registration,
    });
    if (token) {
      localStorage.setItem("fcmToken", token);
      onMessage(messaging, (payload) => {
        console.log("Foreground message received:", payload);
        new Notification(payload.notification?.title ?? "New Notification!", {
          body: payload.notification?.body ?? "You have a new message.",
          silent: false,
        });
      });
      return token;
    }
  } catch (error) {
    console.error("Error setting up notifications:", error);
  }
};

export { intializeNotifications };
