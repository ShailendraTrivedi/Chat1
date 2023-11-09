import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDDu-ehqPUw-4b-po-yG966QlGBzHGbNaQ",
  authDomain: "contact-d4be2.firebaseapp.com",
  projectId: "contact-d4be2",
  storageBucket: "contact-d4be2.appspot.com",
  messagingSenderId: "670622376244",
  appId: "1:670622376244:web:4663b10fc0752c215d8561",
  databaseURL: "https://contact-d4be2-default-rtdb.firebaseio.com",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export default app;
export {
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  db,
  storage,
  updateProfile,
};
