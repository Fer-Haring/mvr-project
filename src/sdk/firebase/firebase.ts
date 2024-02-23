import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAZLRQFhWyNu8_QzDEnhhyQZwxYz_2FjDM',
  authDomain: 'medicinevaperoom-1.firebaseapp.com',
  projectId: 'medicinevaperoom-1',
  storageBucket: 'medicinevaperoom-1.appspot.com',
  messagingSenderId: '6102653959',
  appId: '1:6102653959:web:024d8554b87a0bef17dea2',
  databaseURL: 'https://medicinevaperoom-1-default-rtdb.firebaseio.com',
};

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);
export const db = getFirestore(firebase);
export const database = getDatabase(firebase);
export const provider = new GoogleAuthProvider();
export const storage = getStorage();
export const auth = getAuth();
