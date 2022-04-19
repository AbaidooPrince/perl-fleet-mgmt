import api from '../../services/api'

export default {
  namespaced: true,
  state: {
    archivedView: false,
    images: [],
    image: {},
    documents: [],
    document: {},
    filePagination: {
      currentPage: 1,
      lastPage: 1,
      firstPage: 1
    }

  },
  mutations: {
    VIEW_ARCHIVED_FILES (state, data) {
      state.archivedView = data
    },
    SET_ALL_IMAGES (state, data) {
      state.images = data
    },
    SET_IMAGE (state, data) {
      state.images = data
    },
    SET_ALL_DOCUMENTS (state, data) {
      state.documents = data
    },
    SET_DOCUMENT (state, data) {
      state.images = data
    },
    SET_FILE_PAGINATION (state, data) {
      state.filePagination = data
    }
  },
  actions: {
    async getAllArchivedFiles ({ commit, rootState }, data) {
      try {
        const response = await api().get(`vehicles/vehicle-archive-files/${rootState.vehicles.vehicleDetails.id}/${data.page}`)
        if (response.data.message === 'success') {
          var allPhotos = response.data.files.data.filter((photo) => photo.type === 'photo')
          commit('SET_ALL_IMAGES', allPhotos)
          var allDocs = response.data.files.data.filter((photo) => photo.type === 'document')
          commit('SET_ALL_DOCUMENTS', allDocs)
          commit('VIEW_ARCHIVED_FILES', true)
          return 'success'
        } else {
          return 'error'
        }
      } catch (e) {
        if (e.response.data) {
          return e.response.data
        }
        console.log(e)
      }
    },
    async getAllVehicleFiles ({ commit, rootState }, data) {
      try {
        const response = await api().get(`vehicles/vehicle-files/${rootState.vehicles.vehicleDetails.id}/${data.page}`)
        if (response.data.message === 'success') {
          var allPhotos = response.data.files.data.filter((photo) => photo.type === 'photo')
          commit('SET_ALL_IMAGES', allPhotos)
          var allDocs = response.data.files.data.filter((photo) => photo.type === 'document')
          commit('SET_ALL_DOCUMENTS', allDocs)
          commit('VIEW_ARCHIVED_FILES', false)
          return 'success'
        }
      } catch (e) {
        console.log(e)
      }
    },
    async addFile ({ dispatch }, data) {
      try {
        const response = await api().post('vehicles/file', data)
        if (response.data.message === 'success') {
          dispatch('getAllVehicleFiles', { page: 1 })
          return 'success'
        }
      } catch (e) {
        console.log(e)
      }
    },
    async updateFile ({ dispatch }, data) {
      try {
        const response = await api().put(`vehicles/update-file/${data.id}`, data)
        if (response.data.message === 'success') {
          dispatch('getAllVehicleFiles', { page: 1 })
          return 'success'
        } else if (response.data.error) {
          return response.data
        }
      } catch (e) {
        console.log(e)
      }
    },
    async archiveFile ({ dispatch }, data) {
      try {
        const response = await api().put(`vehicles/archive-file/${data.id}`)
        if (response.data.message === 'success') {
          dispatch('getAllVehicleFiles', { page: 1 })
          return 'success'
        }
      } catch (e) {
        console.log(e)
      }
    },
    async restoreFile ({ dispatch }, data) {
      try {
        const response = await api().put(`vehicles/unarchive-file/${data.id}`)
        if (response.data.message === 'success') {
          dispatch('getAllArchivedFiles', { page: 1 })
          return 'success'
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}
