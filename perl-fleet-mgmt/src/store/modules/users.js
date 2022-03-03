import Api from '../../services/api'

export default {
  namespaced: true,
  state: {
    usersPagination: {},
    users: [],
    user: {},
    allGroups: []
  },
  mutations: {
    SET_USERS_PAGINATION (state, data) {
      state.usersPagination = data
    },
    SET_USERS (state, data) {
      state.users = data
    },
    SET_USER (state, data) {
      state.user = data
    },
    SET_GROUPS (state, data) {
      state.allGroups = data
    }
  },
  actions: {
    async updateGroup ({ dispatch }, data) {
      try {
        const response = await Api().put(`/users/group/${data.id}`, data)
        if (response.data.message === 'success') {
          dispatch('getAllGroups')
          return 'success'
        }
      } catch (e) {
        console.log(e)
        return 'error'
      }
    },
    // /users/group
    async addGroup ({ dispatch }, data) {
      try {
        const response = await Api().post('/users/group', data)
        if (response.data.message === 'success') {
          dispatch('getAllGroups')
          return 'success'
        }
      } catch (e) {
        console.log(e)
        return e.response.data
      }
    },
    async getAllGroups ({ commit }) {
      try {
        const response = await Api().get('/users/groups')
        if (response.data.message === 'success') {
          commit('SET_GROUPS', response.data.groups)
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
    async getAllPersonnel ({ commit }, data) {
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
        const response = await Api().put(`/users/user/${user.id}`, user)
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
