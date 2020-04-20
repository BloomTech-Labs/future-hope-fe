import { TOGGLE_SIDEBAR } from '../actions/sidebar'

const initialState = {
  sidebar: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return {
        ...state,
        sidebar: !state.sidebar
      }
    default:
      return {
        ...state
      }
  }
}

export default reducer;