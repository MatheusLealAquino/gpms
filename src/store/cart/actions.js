export function addItem (context, data) {
  try {
    context.commit('addItem', data.item)
    return true
  } catch (err) {
    return false
  }
}

export function removeItem (context, data) {
  try {
    context.commit('removeItem', data.item)
    return true
  } catch (err) {
    return false
  }
}

export function removeAll (context, data) {
  context.commit('removeAll')
}
