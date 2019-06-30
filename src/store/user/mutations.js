export function login (state, data) {
  state.id = data.userId
  state.token = data.id
  state.name = data.realm
  state.email = data.email
  state.favorites = data.favorites
}

export function logout (state) {
  state.id = null
  state.token = null
  state.name = null
  state.email = null
}

export function setFavorites (state, data) {
  state.favorites = data
}
