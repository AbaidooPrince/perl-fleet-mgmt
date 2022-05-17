import Api from '../../services/api'

export default {
  namespaced: true,
  state: {
    allServices: [],
    servicePagination: {},
    serviceData: {},
    allInspectionForms: [],
    inspectionForm: {},
    selectedForm: {}
  },
  mutations: {
    SET_SELECTED_FORM (state, data) {
      state.selectedForm = data
    },
    SET_ALL_SERVICES (state, data) {
      state.allServices = data
    },
    SET_SERVICE_PAGINATION (state, data) {
      state.servicePagination = data
    },
    SET_SERVICE_DATA (state, data) {
      state.serviceData = data
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
    async getAllServices ({ commit }, data) {
      try {
        const response = await Api().get(`/services/services/${data.page}`)
        if (response.data.message === 'success') {
          commit('SET_ALL_SERVICES', response.data.services.data)
          commit('SET_SERVICE_PAGINATION', {
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
    async addService ({ commit, dispatch }, data) {
      try {
        const response = await Api().post('/services/service', data)
        if (response.data.message === 'success') {
          // commit('EDIT_MODE', true)
          commit('SET_SERVICE_DATA', response.data.service)
          dispatch('getAllServices', { page: 1 })
          return { message: 'success', id: response.data.service.id }
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
          commit('SET_SERVICE_DATA', response.data.inspection)
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
          // commit('SET_SERVICE_PAGINATION', {
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
