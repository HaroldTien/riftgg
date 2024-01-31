// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import { Firestore, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import 'firebase/firestore';
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBhtfh4ayj7L9Kk9U58326AJC_EpwTsG0o",
  authDomain: "rift-gg.firebaseapp.com",
  projectId: "rift-gg",
  storageBucket: "rift-gg.appspot.com",
  messagingSenderId: "651937204588",
  appId: "1:651937204588:web:ebaf55bdfb7b66c4748b49",
  measurementId: "G-1DG8HQVD9T",
  storageBucket:'rift-gg.appspot.com',
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const db=getFirestore(app)
export const auth=getAuth(app)
export const storage=getStorage(app)
