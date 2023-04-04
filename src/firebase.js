import { initializeApp, getApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAHjMTqUkavVs5UQgz8YDJMK06-OYdCAD8",
    authDomain: "kishurit-e156f.firebaseapp.com",
    projectId: "kishurit-e156f",
    storageBucket: "kishurit-e156f.appspot.com",
    messagingSenderId: "165582043569",
    appId: "1:165582043569:web:b9d6c7c75adf76db05a590",
    measurementId: "G-GM68E0XZPG"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage (app)
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();