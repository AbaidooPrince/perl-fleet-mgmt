import Api from '../../services/api'

export default {
  namespaced: true,
  state: {
    usersPagination: {},
    users: [],
    user: {},
    allRoles: [],
    role: {},
    allGroups: [],
    allOperators: [],
    operatorsPagination: {}
  },
  getters: {
    userBasicDetails: state => {
      return {
        id: state.user.id,
        firstName: state.user.firstName,
        middleName: state.user.middleName,
        lastName: state.user.lastName,
        email: state.user.email,
        profileImage: state.user.profileImage,
        groupId: state.user.groupId,
        personnelType: state.user.personnelType,
        employee: state.user.employee,
        operator: state.user.operator
      }
    },
    userUserAccess: state => {
      return {
        userTypeId: state.user.userTypeId,
        accessEnabled: state.user.accessEnabled,
        role: state.user.role
      }
    }
  },
  mutations: {
    SET_USERS_PAGINATION (state, data) {
      state.usersPagination = data
    },
    SET_ROLES (state, data) {
      state.allRoles = data
    },
    SET_ROLE (state, data) {
      state.role = data
    },
    SET_USERS (state, data) {
      state.users = data
    },
    SET_USER (state, data) {
      state.user = data
    },
    SET_GROUPS (state, data) {
      state.allGroups = data
    },
    ADD_NEW_GROUP (state, data) {
      state.allGroups.push(data)
    },
    SET_ALL_OPERATORS (state, data) {
      state.allOperators = data
    },
    SET_OPERATORS_PAGINATION (state, data) {
      state.operatorsPagination = data
    }
  },
  actions: {
    // /users/group
    async deleteUser ({ dispatch }, data) {
      try {
        const response = await Api().delete(`/users/user/${data.id}`, data)
        if (response.data.message === 'success') {
          dispatch(`${data.dispatch}`)
          return 'success'
        }
      } catch (e) {
        console.log(e)
        return e.response.data
      }
    },
    async deleteGroup ({ dispatch }, data) {
      try {
        const response = await Api().delete(`/users/group/${data.id}`, data)
        if (response.data.message === 'success') {
          dispatch('getAllGroups')
          return 'success'
        }
      } catch (e) {
        console.log(e)
        return e.response.data
      }
    },
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
    async deleteRole ({ dispatch }, data) {
      try {
        const response = await Api().delete(`/users/group/${data.id}`, data)
        if (response.data.message === 'success') {
          dispatch('getAllRoles', { page: 1 })
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
    // /users/roles
    async addRole ({ dispatch }, data) {
      try {
        const response = await Api().post('/users/role', data)
        if (response.data.message === 'success') {
          dispatch('getAllRoles', { page: 1 })
          return 'success'
        }
      } catch (e) {
        console.log(e)
        return e.response.data
      }
    },
    async updateRole ({ dispatch }, data) {
      try {
        const response = await Api().put(`/users/role/${data.id}`, data)
        if (response.data.message === 'success') {
          dispatch('getAllRoles', { page: 1 })
          return 'success'
        }
      } catch (e) {
        console.log(e)
        return 'error'
      }
    },
    async getAllRoles ({ commit }, data) {
      try {
        const response = await Api().get(`/users/roles/${data.page}`)
        if (response.data.message === 'success') {
          commit('SET_ROLES', response.data.roles.data)
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
    setUsersData ({ commit }, response) {
      commit('SET_USERS', response.data.users.data)
      commit('SET_USERS_PAGINATION', {
        firstPage: response.data.users.firstPage,
        lastPage: response.data.users.lastPage,
        currentPage: response.data.users.currentPage
      })
      return 'success'
    },
    async getAllPersonnel ({ dispatch }, data) {
      try {
        const response = await Api().get(`/users/paginated-users/${data.page}`)
        if (response.data.message === 'success') {
          return dispatch('setUsersData', response)
        }
      } catch (e) {
        return e.response.data
      }
    },
    async getAllUsers ({ dispatch }, data) {
      try {
        const response = await Api().get(`/users/users-with-access/${data.page}`)
        if (response.data.message === 'success') {
          return dispatch('setUsersData', response)
        }
      } catch (e) {
        return e.response.data
      }
    },
    async getAllNonAccessUsers ({ dispatch }, data) {
      try {
        const response = await Api().get(`/users/users-without-access/${data.page}`)
        if (response.data.message === 'success') {
          return dispatch('setUsersData', response)
        }
      } catch (e) {
        return e.response.data
      }
    },
    // getAllArchivedUsers
    async getAllArchivedUsers ({ dispatch }, data) {
      try {
        const response = await Api().get(`/users/users-without-access/${data.page}`)
        if (response.data.message === 'success') {
          return dispatch('setUsersData', response)
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
    },
    async getAllOperators ({ commit }, data) {
      try {
        const response = await Api().get(`/users/users-operators/${data.page}`)
        if (response.data.message === 'success') {
          commit('SET_ALL_OPERATORS', response.data.operators.data)
          commit('SET_OPERATORS_PAGINATION', {
            firstPage: response.data.operators.firstPage,
            lastPage: response.data.operators.lastPage,
            currentPage: response.data.operators.currentPage
          })
          return 'success'
        }
      } catch (e) {
        return e.response.data
      }
    }

  }
}
