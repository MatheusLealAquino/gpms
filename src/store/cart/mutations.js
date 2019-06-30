export function addItem (state, data) {
  state.items.push(data)
}

export function removeItem (state, data) {
  state.items = state.items.filter(el => el.id !== data.id)
}

export function removeAll (state) {
  state.items = []
}
