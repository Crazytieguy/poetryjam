import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCxK_XXRZ-foXtdGIYI92Y7sfHVppslCtE",
  authDomain: "innate-works-346120.firebaseapp.com",
  projectId: "innate-works-346120",
  storageBucket: "innate-works-346120.appspot.com",
  messagingSenderId: "796911162248",
  appId: "1:796911162248:web:246ec4457f582ff7e2e03d",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
if (!import.meta.env.PROD) {
  connectAuthEmulator(auth, "http://localhost:9099");
  connectFirestoreEmulator(db, "localhost", 8080);
}
