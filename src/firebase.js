import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAiNihemFQio20dhfDFCRUdz8cCK53D9C8",
  authDomain: "zaims-constant.firebaseapp.com",
  databaseURL: "https://zaims-constant.firebaseio.com",
  projectId: "zaims-constant",
  storageBucket: "zaims-constant.appspot.com",
  messagingSenderId: "972035840554",
  appId: "1:972035840554:web:07b85049983c446586c153",
  measurementId: "G-1K8PVW0ZZX"
});

const db = firebaseApp.firestore();

export { db };