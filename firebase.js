import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "MY API_KEY",
  authDomain: "AUTH_DOMAIN ",
  projectId: "YOUR_ID",
  storageBucket: "STORAGE_BUCKET",
  messagingSenderId: "ID",
  appId: "APPID"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth };
