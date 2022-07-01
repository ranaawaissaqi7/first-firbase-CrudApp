import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7BJktnjRGouXjR96FmYinQ9q0H11lHjY",
  authDomain: "firbase-crudapp.firebaseapp.com",
  projectId: "firbase-crudapp",
  storageBucket: "firbase-crudapp.appspot.com",
  messagingSenderId: "236944593776",
  appId: "1:236944593776:web:ed9ceadfe81ccaf685f5b5",
  measurementId: "G-YHYS9500L9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
export{db};