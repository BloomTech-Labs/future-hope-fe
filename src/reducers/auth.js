import {
  SIGNUP_START,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAIL
} from "../actions/auth";

const initialState = {};

//! Just basic scaffolding, what to do with the payload?
export const authReducer = (state = initialState, action) => {
  console.log("signupReducer", action);
  switch (action.type) {
    case SIGNUP_START:
      return {
        ...state
      };
    case SIGNUP_SUCCESS:
      return {
        ...state
      };
    case SIGNUP_FAIL:
      return {
        ...state
      };
    case LOGIN_START:
      return {
        ...state
      };
    case LOGIN_SUCCESS:
      return {
        ...state
      };
    case LOGIN_FAIL:
      return {
        ...state
      };
    default:
      return {
        ...state
      };
  }
};

export default authReducer;
