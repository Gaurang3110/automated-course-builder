// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import {getStorage} from "firebase/storage"
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ai-course-builder-109cd.firebaseapp.com",
  projectId: "ai-course-builder-109cd",
  storageBucket: "ai-course-builder-109cd.firebasestorage.app",
  messagingSenderId: "1068166561462",
  appId: "1:1068166561462:web:322da79e430fbd230ab017",
  measurementId: "G-WJJ6WDHC3Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage=getStorage(app);