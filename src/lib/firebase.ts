// src/lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  "projectId": "facecheck-hospital",
  "appId": "1:523308899429:web:9742a83fb77f1b5a443a8c",
  "storageBucket": "facecheck-hospital.firebasestorage.app",
  "apiKey": "AIzaSyBjr31FHyzWkStO-rl7dLUe7jAPOMMFSys",
  "authDomain": "facecheck-hospital.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "523308899429"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
