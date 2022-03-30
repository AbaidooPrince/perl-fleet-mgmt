import Api from '../../services/api'
import { setAuthToken } from '../../services/auth'

export default {
  namespaced: true,
  state: {
    currentUser: {},
    token: null,
    userType: {},
    userRouteID: '',
    verifiedUserID: ''
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
    },
    SET_USER_ID (state, data) {
      state.verifiedUserID = data
    }
  },
  getters: {
    fullname: state => {
      return state.currentUser.firstName + ' ' + state.currentUser.lastName
    }
  },
  actions: {
    async resetPassword ({ commit }, data) {
      try {
        const response = await Api().post('/reset-password', data)
        if (response.data.message === 'success') {
          return 'success'
        }
      } catch (e) {

      }
    },
    async requestPassword ({ commit }, data) {
      try {
        const response = await Api().post('/forgot-password', data)
        if (response.data.message === 'success') {
          return 'success'
        }
      } catch (e) {
        console.log('pas', e.response.data)
        return e.response.data
      }
    },
    async verifyUser ({ commit }, data) {
      try {
        const response = await Api().post('/check-email-code', data)
        if (response.data.message === 'success') {
          commit('SET_USER_ID', response.data.user.id)
          return 'success'
        }
      } catch (e) {
      }
    },
    async logUserIn ({ commit }, data) {
      try {
        const response = await Api().post('/login', data)
        if (response.data.message !== 'success') {
          return response.data.message
        } else if (response.data.message === 'success') {
          setAuthToken(response.data.token)
          commit('SET_USER_ID', response.data.user.id)
          commit('SET_USER_TYPE', response.data.user.UserType)
          commit('SET_CURRENT_USER', response.data.user)
          commit('SET_AUTH_TOKEN', response.data.token)
          return 'success'
        }
        if (response.data.error) {
          return response.data.error
        }
      } catch (e) {
        console.log(e.response)
        return e.response.data
      }
    }
  },
  clearCurrentUser ({ commit }) {
    commit('SET_USER_LOGGED_OUT')
  }
}
