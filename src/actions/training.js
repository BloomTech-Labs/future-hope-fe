// action types
export const FETCH_TRAINING_CREATE_START = "TRAINING_CREATE_START"
export const FETCH_TRAINING_CREATE_SUCCESS = "TRAINING_CREATE_SUCCESS"
export const FETCH_TRAINING_CREATE_FAILURE = "TRAINING_CREATE_FAILURE"

// action creators
export const getTraining = training => (category, links) => {
  if (training) {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
      const firestore = getFirestore()
      let trainingMaterial = null

      firestore
        .collection("trainingTabNav")
        .doc(`${category}`)
        .collection("modules")
        .doc(`${links}`)
        .onSnapshot(snapshot => {
          trainingMaterial = snapshot.data()

          if (snapshot) {
            dispatch({ type: FETCH_TRAINING_CREATE_START, trainingMaterial })
          } else {
            dispatch({
              type: FETCH_TRAINING_CREATE_FAILURE,
              message: "Unable to get Training Materials."
            })
          }
        })
    }
  } else {
    return dispatch => {
      dispatch({
        type: FETCH_TRAINING_CREATE_FAILURE,
        message: "Unable to get Training Materials."
      })
    }
  }
}