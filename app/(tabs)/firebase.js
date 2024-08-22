import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBU-515LpoouRXRzltgKVi8PSUCj00pte0",
  authDomain: "instagram-78503.firebaseapp.com",
  projectId: "instagram-78503",
  storageBucket: "instagram-78503.appspot.com",
  messagingSenderId: "984193148709",
  appId: "1:984193148709:web:bc41625c8fa07c41031ccc",
  measurementId: "G-0WGZJYJKCD",
};

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);
const storage = getStorage(firebase);
export { database, firebase, storage };
