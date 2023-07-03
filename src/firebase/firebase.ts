
import { initializeApp ,getApp, getApps} from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyB81QOXSbeWGzP_nOJt3LBRPEP5bTJmBmw",
  authDomain: "leetcode-36d69.firebaseapp.com",
  projectId: "leetcode-36d69",
  storageBucket: "leetcode-36d69.appspot.com",
  messagingSenderId: "592633311667",
  appId: "1:592633311667:web:086b3bf77532ce903bdbc6"
};


const app = !getApps.length? initializeApp(firebaseConfig):getApp();
const auth = getAuth(app);
const firestore=getFirestore(app);

export {auth,firestore,app};