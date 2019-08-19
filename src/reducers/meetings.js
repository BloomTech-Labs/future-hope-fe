import {
  MEETING_CREATE,
  MEETING_CREATE_SUCCESS,
  MEETING_CREATE_FAIL
} from "../actions/meetings";

const initialState = {};

//! Just basic scaffolding, what to do with the payload?
const meetingsReducer = (state = initialState, action) => {
  console.log("reducer", action);
  switch (action.type) {
    case MEETING_CREATE:
      return {
        ...state
      };
    case MEETING_CREATE_SUCCESS:
      return {
        ...state
      };
    case MEETING_CREATE_FAIL:
      return {
        ...state
      };
  }
};

export default meetingsReducer;
