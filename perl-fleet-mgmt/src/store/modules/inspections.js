import Api from '../../services/api'

export default {
  namespaced: true,
  state: {
    allInspections: [],
    inspectionPagination: {},
    inspectionData: {}

  },
  mutations: {
    SET_ALL_INSPECTIONS (state, data) {
      state.allInspections = data
    },
    SET_INSPECTION_PAGINATION (state, data) {
      state.inspectionPagination = data
    },
    SET_INSPECTION_REPORT (state, data) {
      state.inspectionData = data
    }

  },
  actions: {
    // vehicle inspections Actions
    async getAllInspections ({ commit }, data) {
      console.log(data)
      try {
        const response = await Api().get(`/vehicles/inspections/${data.page}`)
        if (response.data.message === 'success') {
          commit('SET_ALL_INSPECTIONS', response.data.inspections.data)
          commit('SET_INSPECTION_PAGINATION', {
            firstPage: response.data.inspections.firstPage,
            lastPage: response.data.inspections.lastPage,
            currentPage: response.data.inspections.currentPage
          })
          return 'success'
        }
      } catch (e) {
        return e.response.data
      }
    },
    async addInspection ({ commit, dispatch }, data) {
      try {
        const response = await Api().post('/vehicles/inspection', data)
        if (response.data.message === 'success') {
          // commit('EDIT_MODE', true)
          commit('SET_INSPECTION_REPORT', response.data.inspection)
          dispatch('getAllInspections', { page: 1 })
          return { message: 'success', id: response.data.inspection.id }
        }
      } catch (e) {
        console.log(e)
        return 'error'
      }
    },
    async getVehicleInspectionData ({ commit }, id) {
      try {
        const response = await Api().get(`/vehicles/inspection/${id}`)
        if (response.data.message === 'success') {
          // commit('EDIT_MODE', true)
          commit('SET_INSPECTION_REPORT', response.data.inspection)
          return 'success'
        }
      } catch (e) {
        console.log(e)
        return 'error'
      }
    }

  }
}
