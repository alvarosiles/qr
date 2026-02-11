import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  doc,
  query,
  where
} from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDYrX_8ZrflR7-ynhEZP4mBQKpXqZNPCc4",
  authDomain: "prueba-crud-f6b90.firebaseapp.com",
  projectId: "prueba-crud-f6b90",
  storageBucket: "prueba-crud-f6b90.firebasestorage.app",
  messagingSenderId: "25178361233",
  appId: "1:25178361233:web:b508f60de355ba65061e30"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc, getDocs, getDoc, updateDoc, doc, query, where };
