import { UsersService } from '../../resource'

export async function login (context, data) {
  try {
    let response = await UsersService.create('login', {
      email: data.email,
      password: data.password
    })
    let favCourses = await UsersService.fetch(response.data.userId + '/wishingCourses')
    response.data.email = data.email
    response.data.realm = data.email.split('@')[0]
    response.data.favorites = favCourses.data
    context.commit('login', response.data)
    return true
  } catch (err) {
    return false
  }
}

export async function logout (context, data) {
  try {
    await UsersService.create(`logout?access_token=${context.state.token}`)
    context.commit('logout')
    return true
  } catch (err) {
    return false
  }
}

export async function fav (context, data) {
  if (!context.state.id) {
    return 'Usuário deve logar para favoritar'
  } else if (context.state.favorites.map(el => el.id).includes(data.id)) {
    try {
      await UsersService.delete(`${context.state.id}/wishingCourses/rel/${data.id}?access_token=${context.state.token}`)
      const favCourses = await UsersService.fetch(`${context.state.id}/wishingCourses`)
      context.commit('setFavorites', favCourses.data)
      return null
    } catch (err) {
      return err
    }
  } else {
    try {
      await UsersService.update(`${context.state.id}/wishingCourses/rel/${data.id}?access_token=${context.state.token}`)
      const favCourses = await UsersService.fetch(`${context.state.id}/wishingCourses`)
      context.commit('setFavorites', favCourses.data)
      return null
    } catch (err) {
      return err
    }
  }
}
