import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

const rootReducer = combineReducers({
  firebase: firebaseReducer, //handles auth syncing
  firestore: firestoreReducer //has all the data =D
});

export default rootReducer;
