export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR'

export const toggleSidebar = (bool) => {
  return { type: TOGGLE_SIDEBAR, payload: bool }
}

export const TOGGLE_TRAINING = 'TOGGLE_TRAINING'

export const toggleTraining = (bool) => {
  return { type: TOGGLE_TRAINING, payload: bool }
}