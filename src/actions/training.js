import axios from "axios";

// action types
export const FETCH_TRAINING_CREATE_START = "TRAINING_CREATE_START"
export const FETCH_TRAINING_CREATE_SUCCESS = "TRAINING_CREATE_SUCCESS";
export const FETCH_TRAINING_CREATE_FAILURE = "TRAINING_CREATE_FAILURE";

// action creators
export const getTraining = training => 
(category, links) => 
{
    if (training) {
        return (dispatch, getState, { getFirebase, getFirestore }) => {
            const firestore = getFirestore();
            let trainingMaterial = null;

            firestore
                // .collection("training")
                .collection("trainingTabNav")
                .doc(`${category}`)
                .collection("modules")
                .doc(`${links}`)
                .onSnapshot(snapshot => {
                    trainingMaterial = snapshot.data();
                    console.log(trainingMaterial, "training material");

                    if (snapshot) {
                        dispatch({ type: FETCH_TRAINING_CREATE_START, trainingMaterial });

                    } else {
                        dispatch({ type: FETCH_TRAINING_CREATE_FAILURE, message: "Unable to get Training Materials."});
                    }
                });
        };
    } else {
        return dispatch => {
            dispatch({ type: FETCH_TRAINING_CREATE_FAILURE, message: "Unable to get Training Materials."});
        };
    }
  
};

// Our old axios 

  // dispatch({ type: FETCH_TRAINING_CREATE_START })
    // axios
    //     .get(``)
    //     .then(res => {
    //         console.log("axios request: ", res.data)
    //         dispatch({ type: FETCH_TRAINING_CREATE_SUCCESS, payload: res.data });
    //     })
    //     .catch(error => {
    //         console.log("Error, please try again.", error.res);
    //         dispatch({ type: FETCH_TRAINING_CREATE_FAILURE, payload: error.res});
    //     });
