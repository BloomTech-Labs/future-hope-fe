import { TOGGLE_SIDEBAR } from '../actions/sidebar'

const initialState = {
  sidebar: window.screen.width <= 600 ? true : false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return {
        ...state,
        sidebar: action.payload || !state.sidebar
      }
    default:
      return {
        ...state
      }
  }
}

export default reducer;