import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIRE_API_KEY,
  authDomain: "zaims-constant.firebaseapp.com",
  databaseURL: process.env.REACT_APP_FIRE_DB_URL,
  projectId: "zaims-constant",
  storageBucket: "zaims-constant.appspot.com",
  messagingSenderId: "972035840554",
  appId: "1:972035840554:web:07b85049983c446586c153",
  measurementId: "G-1K8PVW0ZZX"
});

const db = firebaseApp.firestore();

export { db };