import { SIGNUP_START, SIGNUP_SUCCESS, SIGNUP_FAIL } from "../actions/signup";

const initialState = {};

//! Just basic scaffolding, what to do with the payload?
const signupReducer = (state = initialState, action) => {
  console.log("reducer", action);
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
  }
};

export default signupReducer;
