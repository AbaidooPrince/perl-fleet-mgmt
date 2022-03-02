import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import authentication from './modules/authentication'
import users from './modules/users'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState({
    storage: window.sessionStorage
  })],
  state: {
    snackbar: false,
    snackBarText: '',
    error: false,
    userType: [
      { id: 1, name: 'Administrator' },
      { id: 2, name: 'Regular User' },
      { id: 3, name: 'Non Access User' }
    ],
    userStatus: [
      { id: 1, name: 'Active', color: 'success' },
      { id: 2, name: 'Deactivated', color: 'error lighten-2' },
      { id: 3, name: 'No Access', color: 'grey' }
    ]
  },
  mutations: {
    SET_SNACKBAR_ON (state) {
      state.snackbar = true
    },
    SET_SNACKBAR_OFF (state) {
      state.snackbar = false
      state.snackBarText = ''
    },
    SET_SNACKBAR_CONTENT (state, data) {
      state.snackBarText = data
    },
    SET_IS_ERROR (state, data) {
      state.error = data
    }
  },
  actions: {
    showSnackBar ({ commit }, data) {
      commit('SET_SNACKBAR_CONTENT', data.message)
      commit('SET_IS_ERROR', data.error)
      commit('SET_SNACKBAR_ON')
      setTimeout(() => {
        commit('SET_SNACKBAR_CONTENT', '')
        commit('SET_SNACKBAR_OFF')
      }, 5000)
    }
  },
  modules: {
    authentication,
    users

  }
})
