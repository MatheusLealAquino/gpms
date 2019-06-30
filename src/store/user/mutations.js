export function login (state, data) {
  console.log(data)
  state.id = data.userId
  state.token = data.id
  state.name = data.realm
  state.email = data.email
}

export function logout (state) {
  state.id = null
  state.token = null
  state.name = null
  state.email = null
}
