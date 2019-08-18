import {
  MESSAGE_CREATE,
  MESSAGE_CREATE_SUCCESS,
  MESSAGE_CREATE_FAIL
} from "../actions/messaging";

const initialState = {};

//! Just basic scaffolding, what to do with the payload?
const messagingReducer = (state = initialState, action) => {
  console.log("reducer", action);
  switch (action.type) {
    case MESSAGE_CREATE:
      return {
        ...state
      };
    case MESSAGE_CREATE_SUCCESS:
      return {
        ...state
      };
    case MESSAGE_CREATE_FAIL:
      return {
        ...state
      };
  }
};

export default messagingReducer;
