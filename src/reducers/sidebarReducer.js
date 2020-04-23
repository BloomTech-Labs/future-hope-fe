import { TOGGLE_SIDEBAR, TOGGLE_TRAINING } from '../actions/sidebar'

const initialState = {
  sidebar: window.screen.width <= 900 ? true : false,
  training: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return {
        ...state,
        sidebar: action.payload,
        //Closes the training drawer if sidebar is closed
        training: action.payload === true ? false : false
      }
    case TOGGLE_TRAINING:
      return {
        ...state,
        //Opens sidebar if training is open
        sidebar: action.payload === true ? false : false,
        training: action.payload
      }
    default:
      return {
        ...state
      }
  }
}

export default reducer;