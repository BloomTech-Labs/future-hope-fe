import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"
import "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyC-L823T5HalQTT2T374fQBDil-6co3HW8",
  authDomain: "future-hope-school.firebaseapp.com",
  databaseURL: "https://future-hope-school.firebaseio.com",
  projectId: "future-hope-school",
  storageBucket: "future-hope-school.appspot.com",
  messagingSenderId: "586160685845",
  appId: "1:586160685845:web:926a03982f90efa2"
}

//Initialize Firebase

firebase.initializeApp(firebaseConfig)
export const firestore = firebase.firestore()
export const auth = firebase.auth()
export const storage = firebase.storage()

export const provider = new firebase.auth.GoogleAuthProvider()
export const fbProvider = new firebase.auth.FacebookAuthProvider()
export const signInWithGoogle = () => auth.signInWithPopup(provider) //*provides the pop up window when loggin in with google
export const signInWithFacebook = () => auth.signInWithPopup(fbProvider) //attempt at fb login

firebase.firestore() //! dropped the .settings({ timestampsInSnapshots: true }) due to the warning.
export default firebase
