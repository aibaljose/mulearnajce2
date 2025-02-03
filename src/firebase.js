// import React, { useState } from "react";

// import { initializeApp } from "firebase/app";
// import { getDatabase, ref, push } from "firebase/database";
// import { useNavigate } from "react-router-dom";
// // Firebase configuration
// const firebaseConfig = {
   
// };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const database = getDatabase(app);
// export default database;



import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { ref, push, set,onValue,remove } from 'firebase/database';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAflzRHw81hheIVNx7kaLDjJeAF2jqMUvQ",
    authDomain: "acmajce-c2264.firebaseapp.com",
    databaseURL: "https://acmajce-c2264-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "acmajce-c2264",
    storageBucket: "acmajce-c2264.firebasestorage.app",
    messagingSenderId: "376761298892",
    appId: "1:376761298892:web:3393992b210baffd297769"
  };
  

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
export const db = getFirestore(app);

// Initialize Firebase Storage for file uploads
export const storage = getStorage(app);
export { database,ref, push, set ,onValue,remove};

