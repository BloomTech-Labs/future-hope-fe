import {
  FETCH_MENTOR_START,
  FETCH_MENTOR_SUCCESS,
  FETCH_MENTOR_FAILURE
} from "../actions/mentors";

const initialState = {
  mentors: [],
  fetchingMentors: false,
  error: ""
};

const mentorReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MENTOR_START:
      return {
        ...state,
        fetchingMentors: true,
        error: action.err
      };
    case FETCH_MENTOR_SUCCESS:
      return {
        ...state,
        // mentors: action.payload,
        fetchingMentors: false,
        error: ""
      };
    case FETCH_MENTOR_FAILURE:
      return {
        ...state,
        fetchingMentors: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default mentorReducer;
