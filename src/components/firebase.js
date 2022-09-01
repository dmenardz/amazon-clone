// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBqpxjcnl9ZzxqxfjwXMFtz_TT_lqttivI",
  authDomain: "movie-flex-e2169.firebaseapp.com",
  projectId: "movie-flex-e2169",
  storageBucket: "movie-flex-e2169.appspot.com",
  messagingSenderId: "846625483730",
  appId: "1:846625483730:web:eba2fe9a4268bf0f98760b",
  measurementId: "G-WQR1VR5GFX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
//const db = firestore();
//const analytics = getAnalytics(app);

export default ( auth);