// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmN_J8YJPtXdI_yI800VG3WzVMbygXaUE",
  authDomain: "foodstop-4cba2.firebaseapp.com",
  projectId: "foodstop-4cba2",
  storageBucket: "foodstop-4cba2.firebasestorage.app",
  messagingSenderId: "1017180630654",
  appId: "1:1017180630654:web:e50b84ce3f23c86ce1f22f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export {db};