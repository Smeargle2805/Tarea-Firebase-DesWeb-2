import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyASnWmCE56c5KcdK73m4MpkfTVLO-HJ76Y",
  authDomain: "crud-firebase-563ac.firebaseapp.com",
  projectId: "crud-firebase-563ac",
  storageBucket: "crud-firebase-563ac.appspot.com",
  messagingSenderId: "41665577615",
  appId: "1:41665577615:web:800b1c3da7328cc4eba6fa"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)