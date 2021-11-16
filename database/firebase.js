import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCBmVLeclJQv7h7BjSFwoIgjMmZ3hW-wZY",
  authDomain: "projectmanagementsystem-65b79.firebaseapp.com",
  databaseURL:
    "https://projectmanagementsystem-65b79-default-rtdb.firebaseio.com",
  projectId: "projectmanagementsystem-65b79",
  storageBucket: "projectmanagementsystem-65b79.appspot.com",
  messagingSenderId: "853768503268",
  appId: "1:853768503268:web:43e84bc41db49004d991f1",
  measurementId: "G-MJ8135RRW2",
};

// // Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export default { firebase, db };
