import React, { useState } from "react";

import { initializeApp } from "firebase/app";
import { getDatabase, ref, push } from "firebase/database";
import { useNavigate } from "react-router-dom";
// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAj2oXAeSK3yXyywR2VLFta932W6mcbKx8",
    authDomain: "mulearnajce.firebaseapp.com",
    projectId: "mulearnajce",
    storageBucket: "mulearnajce.firebasestorage.app",
    messagingSenderId: "830392500306",
    appId: "1:830392500306:web:2a5f0c4499cdb41210df8b",
    databaseURL: "https://mulearnajce-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
export default database;