// Import Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBieEov58xywiZICqFdy2V4_cevJL_jQMs",
  authDomain: "mindaid-counselling.firebaseapp.com",
  projectId: "mindaid-counselling",
  storageBucket: "mindaid-counselling.appspot.com",
  messagingSenderId: "41980699630",
  appId: "1:41980699630:web:f4b6bb3d86d4572bb6e4ff"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services (REQUIRED 🔥)
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
