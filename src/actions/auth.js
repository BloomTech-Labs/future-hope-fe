import { firestore } from '../config/fbConfig'
export const SIGNUP_START = "SIGNUP_START";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAIL = "SIGNUP_FAIL";

export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";

export const GET_USER_INFO_SUCCESS = "GET_USER_INFO_SUCCESS";
export const GET_UESR_INFO_FAIL = "GET_UESR_INFO_FAIL";

//store user info into redux
export const userStore = user => {
  //if user exists, then continue. If they don't then log in didn't work.
  if (user) {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
      // const firestore = getFirestore();
      let userInfo = null;

      //search firestore for the doc with current uid
      firestore
        .collection("users")
        .doc(`${user.uid}`)
        .onSnapshot(snapshot => {
          userInfo = snapshot.data();

          //dispatches the userInfo to redux store
          //if snapshot was successfull, send success and userInfo to redux
          if (snapshot) {
            dispatch({ type: GET_USER_INFO_SUCCESS, userInfo });
          } else {
            dispatch({
              type: GET_UESR_INFO_FAIL,
              message: "Unable to Get User Data"
            });
          }
        });
    };
  } else {
    return dispatch => {
      dispatch({
        type: GET_UESR_INFO_FAIL,
        message: "Unable to Get User Data"
      });
    };
  }
};
