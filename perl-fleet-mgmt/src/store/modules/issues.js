import Api from '../../services/api'

export default {
  namespaced: true,
  state: {
    allIssues: [],
    issuePagination: {},
    issueData: {},
    allInspectionForms: [],
    inspectionForm: {},
    selectedForm: {}
  },
  mutations: {
    SET_SELECTED_FORM (state, data) {
      state.selectedForm = data
    },
    SET_ALL_ISSUES (state, data) {
      state.allIssues = data
    },
    SET_ISSUES_PAGINATION (state, data) {
      state.issuePagination = data
    },
    SET_ISSUE_DATA (state, data) {
      state.issueData = data
    },
    SET_ALL_INSPECTION_FORMS (state, data) {
      state.allInspectionForms = data
    },
    SET_INSPECTION_FORM (state, data) {
      state.inspectionForm = data
    }

  },
  actions: {
    // vehicle inspections Actions
    async getAllIssues ({ commit }, data) {
      try {
        const response = await Api().get(`/services/services/${data.page}`)
        if (response.data.message === 'success') {
          commit('SET_ALL_ISSUES', response.data.services.data)
          commit('SET_ISSUES_PAGINATION', {
            firstPage: response.data.services.firstPage,
            lastPage: response.data.services.lastPage,
            currentPage: response.data.services.currentPage
          })
          return 'success'
        }
      } catch (e) {
        return e.response.data
      }
    },
    async getAllOpenedIssues ({ commit }, data) {
      try {
        const response = await Api().get(`/services/services/${data.page}`)
        if (response.data.message === 'success') {
          commit('SET_ALL_ISSUES', response.data.services.data)
          commit('SET_ISSUES_PAGINATION', {
            firstPage: response.data.services.firstPage,
            lastPage: response.data.services.lastPage,
            currentPage: response.data.services.currentPage
          })
          return 'success'
        }
      } catch (e) {
        return e.response.data
      }
    },
    async getAllResolvedIssues ({ commit }, data) {
      try {
        const response = await Api().get(`/services/services/${data.page}`)
        if (response.data.message === 'success') {
          commit('SET_ALL_ISSUES', response.data.services.data)
          commit('SET_ISSUES_PAGINATION', {
            firstPage: response.data.services.firstPage,
            lastPage: response.data.services.lastPage,
            currentPage: response.data.services.currentPage
          })
          return 'success'
        }
      } catch (e) {
        return e.response.data
      }
    },
    async getAllClosedIssues ({ commit }, data) {
      try {
        const response = await Api().get(`/services/services/${data.page}`)
        if (response.data.message === 'success') {
          commit('SET_ALL_ISSUES', response.data.services.data)
          commit('SET_ISSUES_PAGINATION', {
            firstPage: response.data.services.firstPage,
            lastPage: response.data.services.lastPage,
            currentPage: response.data.services.currentPage
          })
          return 'success'
        }
      } catch (e) {
        return e.response.data
      }
    },
    async getAllOverdueIssues ({ commit }, data) {
      try {
        const response = await Api().get(`/services/services/${data.page}`)
        if (response.data.message === 'success') {
          commit('SET_ALL_ISSUES', response.data.issues.data)
          commit('SET_ISSUES_PAGINATION', {
            firstPage: response.data.issues.firstPage,
            lastPage: response.data.issues.lastPage,
            currentPage: response.data.issues.currentPage
          })
          return 'success'
        }
      } catch (e) {
        return e.response.data
      }
    },
    async addIssue ({ commit, dispatch }, data) {
      try {
        const response = await Api().post('/services/service', data)
        if (response.data.message === 'success') {
          // commit('EDIT_MODE', true)
          commit('SET_ISSUE_DATA', response.data.issue)
          dispatch('getAllIssues', { page: 1 })
          return { message: 'success', id: response.data.issue.id }
        }
      } catch (e) {
        console.log(e)
        return 'error'
      }
    },
    async getVehicleServiceData ({ commit }, id) {
      try {
        const response = await Api().get(`/vehicles/inspection/${id}`)
        if (response.data.message === 'success') {
          // commit('EDIT_MODE', true)
          commit('SET_ISSUE_DATA', response.data.inspection)
          return 'success'
        }
      } catch (e) {
        console.log(e)
        return 'error'
      }
    },
    // vehicle inspection forms Actions
    async getAllInspectionForms ({ commit }, data) {
      console.log(data)
      try {
        const response = await Api().get(`/vehicles/forms/${1}`)
        if (response.data.message === 'success') {
          commit('SET_ALL_INSPECTION_FORMS', response.data.forms)
          // commit('SET_ISSUES_PAGINATION', {
          //   firstPage: response.data.inspections.firstPage,
          //   lastPage: response.data.inspections.lastPage,
          //   currentPage: response.data.inspections.currentPage
          // })
          return 'success'
        }
      } catch (e) {
        return e.response.data
      }
    },
    async addInspectionForm ({ commit, dispatch }, data) {
      try {
        const response = await Api().post('/vehicles/form', data)
        if (response.data.message === 'success') {
        // commit('EDIT_MODE', true)
          commit('SET_INSPECTION_FORM', response.data.inspection)
          dispatch('getAllInspectionForms', { page: 1 })
          return { message: 'success', id: response.data.inspection.id }
        }
      } catch (e) {
        console.log(e)
        return e.response.data
      }
    },
    async updateInspectionForm ({ commit, dispatch }, data) {
      try {
        const response = await Api().put(`/vehicles/form/${data.id}`, data)
        if (response.data.message === 'success') {
        // commit('EDIT_MODE', true)
          commit('SET_INSPECTION_FORM', response.data.inspection)
          dispatch('getAllInspectionForms', { page: 1 })
          return { message: 'success', id: response.data.inspection.id }
        }
      } catch (e) {
        console.log(e)
        return e.response.data
      }
    }
  }
}
