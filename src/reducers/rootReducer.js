import meetingsReducer from "./meetings";
import messagingReducer from "./meetings";
import authReducer from "./auth";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  //  Every reducer imported gets listed here!!
  meetingsReducer,
  messagingReducer,
  authReducer
});

export default rootReducer;
