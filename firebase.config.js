// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey:  process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN, //"entheogen-a76f2.firebaseapp.com",
  databaseURL: process.env.FIREBASE_DATABASE_URL, // "https://entheogen-a76f2.firebaseio.com",
  projectId: process.env.FIREBASE_PROJECT_ID, //"entheogen-a76f2",
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET, //"entheogen-a76f2.appspot.com",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID, //"356566894136",
  appId: process.env.FIREBASE_APP_ID, //"1:356566894136:web:7883d85313c1a75efb88cd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage();