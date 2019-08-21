export const FETCH_MENTOR_START = "FETCH_MENTOR_START";
export const FETCH_MENTOR_SUCCESS = "FETCH_MENTOR_SUCCESS";
export const FETCH_MENTOR_FAILURE = "FETCH_MENTOR_FAILURE";

export const fetchMentors = () => {
  return (dispatch, getState, { getFirestore, getFirebase }) => {
    dispatch({ type: FETCH_MENTOR_START });

    const firestore = getFirestore(); //can now access user collection in firestore

    firestore
      .collection("users")
      .where("userType", "===", "mentor")
      .get()
      .then(mentor => {
        console.log("mentor from firestore", mentor)
        dispatch({ type: FETCH_MENTOR_SUCCESS, payload: mentor });
      })
      .catch(err => {
        dispatch({ type: FETCH_MENTOR_FAILURE, payload: err });
      });
  };
};

//accessing the user collection with the userTpe of mentor to display mentors on the page