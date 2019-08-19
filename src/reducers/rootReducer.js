import { combineReducers } from "redux";
import { meetings } from "./meetings";
import { messaging } from "./messaging";
import { signup } from "./signup";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

export default combineReducers({
  meetings,
  messaging,
  signup, //will change to auth
  firebaseReducer, //handles auth syncing
  firestoreReducer //has all the data =D
});
