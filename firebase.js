import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAurR20gdEGpyw7XeVNM6BXnxzvS53_yaI",
  authDomain: "frontend-assignment-4f13f.firebaseapp.com",
  projectId: "frontend-assignment-4f13f",
  storageBucket: "frontend-assignment-4f13f.firebasestorage.app",
  messagingSenderId: "634563142169",
  appId: "1:634563142169:web:6b6f0bcf5f8432c6f44088",
  measurementId: "G-HQSXPB72YZ"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth };
