import {
  SIGNUP_START,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAIL
} from "../actions/auth";

const initialState = {
  authError: null
};

//! Just basic scaffolding, what to do with the payload?
export const authReducer = (state = initialState, action) => {
  // console.log("signupReducer", action);
  switch (action.type) {
    case SIGNUP_START:
      return {
        ...state
      };
    case SIGNUP_SUCCESS:
      console.log("singup succes");
      return {
        ...state,
        authError: null
      };
    case SIGNUP_FAIL:
      console.log("signup fail");
      return {
        ...state,
        authError: action.err.message
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
