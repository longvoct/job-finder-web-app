import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDS_LpX1jZvXcTZiQutAs-dTYm8-YFOgfc",
  authDomain: "job-finder-app-fb9fd.firebaseapp.com",
  databaseURL:
    "https://job-finder-app-fb9fd-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "job-finder-app-fb9fd",
  storageBucket: "job-finder-app-fb9fd.appspot.com",
  messagingSenderId: "981831217824",
  appId: "1:981831217824:web:a8e5d74d5798aa7c56cfc5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Init services
export const db = getFirestore(app);
export const auth = getAuth(app);
