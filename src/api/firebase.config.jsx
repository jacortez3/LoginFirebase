
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA3Rtb-L-PSPUDcujZjXCnljuvFeXfrIcU",
  authDomain: "programacionintegrativa-b99ae.firebaseapp.com",
  projectId: "programacionintegrativa-b99ae",
  storageBucket: "programacionintegrativa-b99ae.appspot.com",
  messagingSenderId: "449071166018",
  appId: "1:449071166018:web:a267af9de14f860d47b3db"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)