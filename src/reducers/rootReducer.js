import { combineReducers } from "redux"
import meetingsReducer from "./meetings"
import messagingReducer from "./messaging"
import authReducer from "./auth"
import mentorReducer from "./mentorReducer"
import trainingReducer from "./trainingReducer"
import sidebarReducer from "./sidebarReducer"
import { firestoreReducer } from "redux-firestore"
import { firebaseReducer } from "react-redux-firebase"

const rootReducer = combineReducers({
  //  Every reducer imported gets listed here!!
  meetings: meetingsReducer,
  messages: messagingReducer,
  auth: authReducer,
  mentors: mentorReducer,
  firebase: firebaseReducer, //handles auth syncing
  firestore: firestoreReducer, //has all the data =D
  training: trainingReducer,
  toggle: sidebarReducer
})

export default rootReducer
