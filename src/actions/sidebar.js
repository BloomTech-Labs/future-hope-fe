export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR'

export const toggleSidebar = (bool) => {
  return {type: TOGGLE_SIDEBAR, payload: bool}
}