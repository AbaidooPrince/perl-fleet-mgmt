import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import Api from '../services/api'
import authentication from './modules/authentication'
import users from './modules/users'
import vehicles from './modules/vehicles'
import inspections from './modules/inspections'
import files from './modules/files'
Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState({
    storage: window.sessionStorage
  })],
  state: {
    canLeaveRoute: true,
    snackbar: false,
    snackBarText: '',
    error: false,
    formEditMode: false,
    save: false,
    update: false,
    userType: [
      { id: 1, name: 'Administrator' },
      { id: 2, name: 'Regular User' },
      { id: 3, name: 'Non Access User' }
    ],
    userStatus: [
      { id: 1, name: 'Active', color: 'success' },
      { id: 2, name: 'Deactivated', color: 'error lighten-2' },
      { id: 3, name: 'Pending', color: 'grey' }
    ]
  },
  mutations: {
    CAN_LEAVE_ROUTE (state, data) {
      state.canLeaveRoute = data
    },
    RESET_MODE (state) {
      state.save = false
      state.update = false
      state.formEditMode = false
    },
    EDIT_MODE (state, data) {
      state.formEditMode = data
    },
    TRIGGER_SAVE (state, data) {
      state.save = data
    },
    TRIGGER_UPDATE (state, data) {
      state.update = data
    },
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
    async uploadFile ({ commit }, data) {
      try {
        const response = await Api().post('/upload-file', data)
        if (response.status === 200) {
          return response.data
        }
      } catch (e) {
        console.log(e)
      }
    },
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
    users,
    vehicles,
    inspections,
    files
  }
})
