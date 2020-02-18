// import axios from "axios";

// export const MEETING_CREATE = "MEETING_CREATE";
// export const MEETING_CREATE_SUCCESS = "MEETING_CREATE_SUCCESS";
// export const MEETING_CREATE_FAIL = "MEETING_CREATE_FAIL";

// // Create Meeting
// export const createMeeting = meeting => dispatch => {
//   dispatch({ type: MEETING_CREATE });
//   return axios
//     .post("/api/meetings", meeting)
//     .then(res => {
//       dispatch({ type: MEETING_CREATE_SUCCESS, payload: res.data });
//     })
//     .catch(err => {
//       console.log(err);
//       dispatch({ type: MEETING_CREATE_FAIL });
//     });
// };
