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

export function fav (state, data) {
  state.favorites.push(data)
}

export function unfav (state, data) {
  state.favorites = state.favorites.filter(el => '' + el.id === '' + data.id)
}
