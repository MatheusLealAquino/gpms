export function addItem (context, data) {
  if (context.state.items.filter(el => el.id === data.id).length === 0) {
    context.commit('addItem', data)
    return true
  } else {
    return false
  }
}

export function removeItem (context, data) {
  if (!context.state.items.filter(el => el.id === data.id).length !== 0) {
    context.commit('removeItem', data)
    return true
  } else {
    return false
  }
}

export function removeAll (context, data) {
  context.commit('removeAll')
}
