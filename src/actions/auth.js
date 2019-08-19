import axios from "axios";

export const SIGNUP_START = "SIGNUP_START";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAIL = "SIGNUP_FAIL";

export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";

// Sign up
export const signUp = user => dispatch => {
  // user = form data?
  dispatch({ type: SIGNUP_START });
  return axios
    .post("/api/register", user) //! endpoint unknonwn
    .then(res => {
      dispatch({ type: SIGNUP_SUCCESS, payload: user.displayName }); //! using displayName?
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: SIGNUP_FAIL });
    });
};

// Login
export const login = user => dispatch => {
  // user = form data?
  dispatch({ type: LOGIN_START });
  return axios
    .post("/api/register", user) //! endpoint unknonwn
    .then(res => {
      dispatch({ type: LOGIN_SUCCESS, payload: user.displayName }); //! using displayName?
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: LOGIN_FAIL });
    });
};
