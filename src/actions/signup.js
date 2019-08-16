import axios from "axios";

export const SIGNUP_START = "SIGNUP_START";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAIL = "SIGNUP_FAIL";

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
