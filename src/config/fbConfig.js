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

export const firestore = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();

export const provider = new firebase.auth.GoogleAuthProvider();
export const fbProvider = new firebase.auth.FacebookAuthProvider();
export const signInWithGoogle = () => auth.signInWithPopup(provider); //*provides the pop up window when loggin in with google
export const signInWithFacebook = () => auth.signInWithPopup(fbProvider); //attempt at fb login

firebase.firestore(); //! dropped the .settings({ timestampsInSnapshots: true }) due to the warning.
export default firebase;
