import axios from "axios";

// action types
export const FETCH_TRAINING_CREATE_START = "TRAINING_CREATE_START"
export const FETCH_TRAINING_CREATE_SUCCESS = "TRAINING_CREATE_SUCCESS";
export const FETCH_TRAINING_CREATE_FAILURE = "TRAINING_CREATE_FAILURE";

// action creators
export const getTraining = () => dispatch => {

    dispatch({ type: FETCH_TRAINING_CREATE_START })
    axios
        .get(`http://localhost:3000/dummy-training`)
        .then(res => {
            console.log("axios request: ", res.data)
            dispatch({ type: FETCH_TRAINING_CREATE_SUCCESS, payload: res.data });
        })
        .catch(error => {
            console.log("Error, please try again.", error.res);
            dispatch({ type: FETCH_TRAINING_CREATE_FAILURE, payload: error.res});
        });
};