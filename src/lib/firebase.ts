// src/lib/firebase.ts
// This file is kept for reference but is no longer used for data storage
// as per user request to use local files.
import { initializeApp, getApps, getApp } from "firebase/app";

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

// Since we are not using Firestore or Auth, we can remove them.
// const db = getFirestore(app);
// const auth = getAuth(app);

export { app };
