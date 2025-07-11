// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey:  process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN, //"***REMOVED_FIREBASE_PROJECT***.firebaseapp.com",
  databaseURL: process.env.FIREBASE_DATABASE_URL, // "https://***REMOVED_FIREBASE_PROJECT***.firebaseio.com",
  projectId: process.env.FIREBASE_PROJECT_ID, //"***REMOVED_FIREBASE_PROJECT***",
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET, //"***REMOVED_FIREBASE_PROJECT***.appspot.com",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID, //"***REMOVED_FIREBASE_SENDER_ID***",
  appId: process.env.FIREBASE_APP_ID, //"1:***REMOVED_FIREBASE_SENDER_ID***:web:***REMOVED_FIREBASE_APP_ID***",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage();