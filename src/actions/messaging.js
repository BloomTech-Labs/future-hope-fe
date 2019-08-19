import axios from "axios";

export const MESSAGE_CREATE = "MESSAGE_CREATE";
export const MESSAGE_CREATE_SUCCESS = "MESSAGE_CREATE_SUCCESS";
export const MESSAGE_CREATE_FAIL = "MESSAGE_CREATE_FAIL";

// Create Message
export const createMessage = message => dispatch => {
  // message = message data?
  dispatch({ type: MESSAGE_CREATE });
  return axios
    .post("/api/messages", message) //! endpoint unknonwn
    .then(res => {
      dispatch({ type: MESSAGE_CREATE_SUCCESS, payload: res.data }); //! Not sure what to return yet
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: MESSAGE_CREATE_FAIL });
    });
};
