// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase,ref} from "firebase/database";
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getDoc,DocumentReference,DocumentData} from 'firebase/firestore';
import 'firebase/auth';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {CardService} from './card.service'
import {MyService} from './card.service'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQxergpqq6qWTHAd4fB0NMnfIhBYtGrFU",
  authDomain: "pokemontcg-1fd78.firebaseapp.com",
  projectId: "pokemontcg-1fd78",
  storageBucket: "pokemontcg-1fd78.appspot.com",
  messagingSenderId: "647044180026",
  appId: "1:647044180026:web:bbda36df8f8178305ced03",
  measurementId: "G-H4XCDWZPS4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

   const database = getDatabase(app);
   const databaseRef = ref(database);
   const db = getFirestore(app);
   const CardRef = doc(db, 'Cards', uid);

   const array = getMyArray()


setDoc(CardRef, dictionary);