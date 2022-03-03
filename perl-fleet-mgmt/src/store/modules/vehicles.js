import Api from '../../services/api'

export default {
  namespaced: true,
  state: {
    vehiclePagination: {},
    vehicles: [],
    vehicle: {},
    allStatus: []
  },
  mutations: {
    SET_VEHICLES_PAGINATION (state, data) {
      state.vehiclePagination = data
    },
    SET_VEHICLES (state, data) {
      state.users = data
    },
    SET_VEHICLE (state, data) {
      state.user = data
    },
    SET_ALL_VEHICLE_STATUS (state, data) {
      state.allStatus = data
    }
  },
  actions: {
    // /users/group
    async addVehicleStatus ({ dispatch }, data) {
      try {
        const response = await Api().post('/vehicles/status', data)
        if (response.data.message === 'success') {
          dispatch('getAllVehicleStatus')
          return 'success'
        }
      } catch (e) {
        console.log(e)
        return e.response.data
      }
    },
    async updateVehicleStatus ({ dispatch }, data) {
      try {
        const response = await Api().put(`/vehicles/status/${data.id}`, data)
        if (response.data.message === 'success') {
          dispatch('getAllVehicleStatus')
          return 'success'
        }
      } catch (e) {
        console.log(e)
        return 'error'
      }
    },
    async getAllVehicleStatus ({ commit }) {
      try {
        const response = await Api().get('/vehicles/statuses')
        if (response.data.message === 'success') {
          commit('SET_ALL_VEHICLE_STATUS', response.data.status)
          return 'success'
        }
      } catch (e) {
        return e.response.data
      }
    },
    async getUser ({ commit }, id) {
      try {
        const response = await Api().get(`/users/user/${id}`)
        if (response.data.message === 'success') {
          commit('SET_USER', response.data.user)
          return 'success'
        }
      } catch (e) {
        return e.response.data
      }
    },
    async getAllVehicles ({ commit }, data) {
      try {
        const response = await Api().get(`/users/paginated-users/${data.page}`)
        if (response.data.message === 'success') {
          commit('SET_USERS', response.data.users.data)
          commit('SET_USERS_PAGINATION', {
            firstPage: response.data.users.firstPage,
            lastPage: response.data.users.lastPage,
            currentPage: response.data.users.currentPage
          })
          return 'success'
        }
      } catch (e) {
        return e.response.data
      }
    },
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
    async updateUser ({ commit }, user) {
      try {
        const response = await Api().post(`/users/user/${user.id}`, user)
        if (response.data.message === 'success') {
          commit('SET_USER', response.data.user)
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
