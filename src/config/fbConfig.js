import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIRESTORE_API_KEY,
  authDomain: process.env.REACT_APP_FIRESTORE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIRESTORE_DB_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIRESTORE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIRESTORE_APP_ID
};

//Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore(); //lol i don't think we even need settings. I know that timestamp is true by default now; yea I dont think we need it at all.
// Im gonna create env variables for our api info. I posted the syntax in the slack channel that Im using.
// coolbeans
//this is amazing!
export default firebase;
