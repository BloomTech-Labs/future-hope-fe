import axios from "axios";

export const MESSAGE_CREATE = "MESSAGE_CREATE";
export const MESSAGE_CREATE_SUCCESS = "MESSAGE_CREATE_SUCCESS";
export const MESSAGE_CREATE_FAIL = "MESSAGE_CREATE_FAIL";

// Create Message
export const createMessage = message => dispatch => {
  dispatch({ type: MESSAGE_CREATE });
  return axios
    .post("/api/messages", message) 
    .then(res => {
      dispatch({ type: MESSAGE_CREATE_SUCCESS, payload: res.data }); 
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: MESSAGE_CREATE_FAIL });
    });
};
