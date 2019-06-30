export function addItem (state, data) {
  state.items.add(data)
}

export function removeItem (state, data) {
  state.items.delete(data)
}

export function removeAll (state) {
  state.items = new Set()
}
