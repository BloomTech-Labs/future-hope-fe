import axios from "axios";

export const MEETING_CREATE = "MEETING_CREATE";
export const MEETING_CREATE_SUCCESS = "MEETING_CREATE_SUCCESS";
export const MEETING_CREATE_FAIL = "MEETING_CREATE_FAIL";

// Create Meeting
export const createMeeting = meeting => dispatch => {
  // meeting = meeting data?
  dispatch({ type: MEETING_CREATE });
  return axios
    .post("/api/meetings", user) //! endpoint unknonwn
    .then(res => {
      dispatch({ type: MEETING_CREATE_SUCCESS, payload: res.data }); //! Not sure what to return yet
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: MEETING_CREATE_FAIL });
    });
};
