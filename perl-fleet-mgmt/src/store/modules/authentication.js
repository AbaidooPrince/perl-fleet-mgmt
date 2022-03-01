import Api from '../../services/api'
import { setAuthToken } from '../../services/auth'

export default {
  namespaced: true,
  state: {
    currentUser: {},
    token: null,
    userType: {},
    userRouteID: ''
  },
  mutations: {
    SET_AUTH_TOKEN (state, data) {
      state.token = data
    },
    SET_CURRENT_USER (state, data) {
      state.currentUser = data
      state.userRouteID = data.id.split('-')[0]
    },
    SET_USER_TYPE (state, data) {
      state.userType = data
    },
    SET_USER_LOGGED_OUT (state) {
      state.userType = null
      state.token = null
      state.currentUser = null
    }
  },
  actions: {
    async verifyUser () {
      try {
        const response = await Api().post('/check-email-code')
        if (response.data.message) {
          return true
        }
      } catch (e) {
      }
    },
    async logUserIn ({ commit }, data) {
      try {
        const response = await Api().post('/login', data)
        if (response.data.message === 'success') {
          setAuthToken(response.data.token)
          commit('SET_USER_TYPE', response.data.user.UserType)
          commit('SET_CURRENT_USER', response.data.user)
          return 'success'
        }
      } catch (e) {
        console.log(e)
        return 'error'
      }
    }
  },
  clearCurrentUser ({ commit }) {
    commit('SET_USER_LOGGED_OUT')
  }
}
