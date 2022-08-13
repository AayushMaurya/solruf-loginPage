// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyA3BHYkwfP6vxquWkR2TKzmblcJK1J2f3c",
  authDomain: "solruflogin.firebaseapp.com",
  projectId: "solruflogin",
  storageBucket: "solruflogin.appspot.com",
  messagingSenderId: "144904486869",
  appId: "1:144904486869:web:76c40867e031e0780c475c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();

// initiaize storage
const storage = getStorage(app);

export {app, auth, storage};