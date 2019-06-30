export function isLogged (state) {
  if (state.id && state.token) return true
  return false
}
