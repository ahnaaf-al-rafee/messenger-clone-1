import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBB864AwGWgc6qSkUe_Ie2pz6cGAJQHsFs",
  authDomain: "messenger-app-rafee.firebaseapp.com",
  databaseURL: "https://messenger-app-rafee.firebaseio.com",
  projectId: "messenger-app-rafee",
  storageBucket: "messenger-app-rafee.appspot.com",
  messagingSenderId: "724423667049",
  appId: "1:724423667049:web:732870c7a11d35e6a8e1f8",
  measurementId: "G-4M0J5ZNHLM",
});

const db = firebaseApp.firestore();

export default db;
