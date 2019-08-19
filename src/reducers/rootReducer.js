import { combineReducers } from "redux";
import { meetings } from "./meetings";
import { messaging } from "./messaging";
import { auth } from "./signup";


export default combineReducers({
  meetings,
  messaging,
  signup, //will change to auth
  firebaseReducer, //handles auth syncing
  firestoreReducer //has all the data =D
});
// do you want to store these like firebase: firebaseReducer?

/*

import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

import meetingsReducer from "./meetings";
import messagingReducer from "./meetings";
import authReducer from "./auth";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
    Every reducer imported gets listed here!!
  meetingsReducer,
  messagingReducer,
  authReducer
});

export default rootReducer;

how do I pull and merge with my branch? I can just delete all this and recreate it
oof i'im not sure. I know you can do it with master but i'm not sure how to with other branches. Maybe you could just run git merge {their branch name here} That sounds correct to me but if it breaks not my fault
lol

maybe just git merge feature.......whatever the branch name is? so switch to that branch. do a pull. then do a git merge with it?
*/
