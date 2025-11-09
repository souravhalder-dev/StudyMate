// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYOarzDE8WfLHgcEDDS_4JvisHf0EZd5I",
  authDomain: "studymate-b1f50.firebaseapp.com",
  projectId: "studymate-b1f50",
  storageBucket: "studymate-b1f50.firebasestorage.app",
  messagingSenderId: "677038651511",
  appId: "1:677038651511:web:2ff36a613009cedf7e2e72",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);