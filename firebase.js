import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDTLQUaFWDJk-quiu0G0_ScoB6rr7wmtuI",
  authDomain: "bearbarber-3080a.firebaseapp.com",
  databaseURL:
    "https://bearbarber-3080a-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "bearbarber-3080a",
  storageBucket: "bearbarber-3080a.appspot.com",
  messagingSenderId: "441029342658",
  appId: "1:441029342658:web:6309df9632971c6ca7125b",
  measurementId: "G-S22NJ1D6S7",
};

export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseDatabase = getDatabase(firebaseApp);
export const firebaseAuth = getAuth(firebaseApp);
