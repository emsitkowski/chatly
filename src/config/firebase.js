// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, serverTimestamp } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3AX_dQChKROxNoLZh_TGLjzEGxuiv24Q",
  authDomain: "chatroom-950b2.firebaseapp.com",
  databaseURL: "https://chatroom-950b2-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "chatroom-950b2",
  storageBucket: "chatroom-950b2.appspot.com",
  messagingSenderId: "723515496177",
  appId: "1:723515496177:web:fd33cc0a557e1e1e55bb50",
};

// initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth service
const auth = getAuth(app);

// initialize database
const db = getFirestore(app);

// initialize server time stamp
const timestamp = serverTimestamp();

export { app, auth, db, timestamp };
