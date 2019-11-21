import { firestore } from "../config/fbConfig"

// action types
export const FETCH_TRAINING_CREATE_START = "TRAINING_CREATE_START"
export const FETCH_TRAINING_CREATE_SUCCESS = "TRAINING_CREATE_SUCCESS"
export const FETCH_TRAINING_CREATE_FAILURE = "TRAINING_CREATE_FAILURE"

// action creators
export const getTraining = () => async dispatch => {
  dispatch({ type: FETCH_TRAINING_CREATE_START })
  try {
    let tabs = await firestore.collection("trainingTabNav").get()
    console.log("TRAINING TABS: ", tabs)
    dispatch({ type: FETCH_TRAINING_CREATE_SUCCESS, payload: tabs })
  } catch (error) {
    console.log("Error, please try again.", error.res)
    dispatch({ type: FETCH_TRAINING_CREATE_FAILURE, payload: error.res })
  }
}
