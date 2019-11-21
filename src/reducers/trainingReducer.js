import {
  FETCH_TRAINING_CREATE_START,
  FETCH_TRAINING_CREATE_SUCCESS,
  FETCH_TRAINING_CREATE_FAILURE
} from "../actions/training"

export const initialState = {
  trainings: [
    {
      id: Math.random(),
      name: "Name",
      training_link: "Link",
      training_type: "Type",
      description: "Description"
    }
  ],
  isFetching: false,
  error: ""
}

export const trainingReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TRAINING_CREATE_START:
      return {
        ...state,
        isFetching: true,
        error: ""
      }
    case FETCH_TRAINING_CREATE_SUCCESS:
      return {
        ...state,
        trainings: action.payload,
        isFetching: false,
        error: ""
      }
    case FETCH_TRAINING_CREATE_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      }

    default:
      return state
  }
}

export default trainingReducer
