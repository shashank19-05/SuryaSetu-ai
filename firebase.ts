import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAg3aIBHWkG9dIdfIoeBtsc7AUwDhpgqTo",
  authDomain: "surya-setu-ai.firebaseapp.com",
  projectId: "surya-setu-ai",
  storageBucket: "surya-setu-ai.firebasestorage.app",
  messagingSenderId: "429402548544",
  appId: "1:429402548544:web:afbcc03201c8cad33ab2a5"
};

// Initialize Firebase only once to prevent Next.js hot-reloading errors
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);