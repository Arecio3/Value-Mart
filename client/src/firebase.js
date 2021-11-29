// Import the functions you need from the SDKs you need
import * as firebase from 'firebase';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import 'dotenv';
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "value-mart-59776.firebaseapp.com",
  projectId: "value-mart-59776",
  storageBucket: "value-mart-59776.appspot.com",
  messagingSenderId: "14834280709",
  appId: "1:14834280709:web:8779b5fecc6b7a5f60ef6c",
  measurementId: "G-3V8NHL6FYD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();