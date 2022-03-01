import Api from '../../services/api'

export default {
  namespaced: true,
  state: {

  },
  mutations: {},
  actions: {
    async addUser ({ commit }, data) {
      try {
        const response = await Api().post('/users/register-user', data)
        if (response.data.message === 'success') {
          return 'success'
        }
      } catch (e) {
        console.log(e)
        return 'error'
      }
    },
    async checkEmail ({ commit }, data) {
      try {
        const response = await Api().post('/users/check-user-email', data)
        console.log('response', response.data)
        if (response.data.info === 'no such user') {
          return true
        } else if (response.data.error === 'User already exists') {
          return false
        } else {
          return false
        }
      } catch (e) {
        return null
      }
    }
  }
}
