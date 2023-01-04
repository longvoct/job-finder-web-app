import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD4QjNqPX37UvOKTsT6Z6bCAgumY-75XAg",
  authDomain: "job-finder-app-c1066.firebaseapp.com",
  projectId: "job-finder-app-c1066",
  storageBucket: "job-finder-app-c1066.appspot.com",
  messagingSenderId: "81602874614",
  appId: "1:81602874614:web:0b9d7801a2f50bad9430d7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Init services
export const db = getFirestore(app);
export const auth = getAuth(app);
