import Api from '../../services/api'

export default {
  namespaced: true,
  state: {
    vehiclePagination: {
      firstPage: 1,
      lastPage: 1,
      currentPage: 1
    },
    vehicles: [],
    vehicle: {},
    vehicleDetails: {},
    vehicleSpecifications: {},
    allStatus: [],
    allVehicleTypes: [],
    typesPagination: {},
    vehicleType: {},
    allFuelTypes: [],
    fuelType: {},
    allVehicleModels: [],
    vehicleModel: {},
    allVehicleAssignments: [],
    assignmentsPagination: {},
    allInspections: [],
    inspectionPagination: {},
    allVehicleMakes: [],
    makesPagination: {}
  },
  mutations: {
    SET_VEHICLES_PAGINATION (state, data) {
      state.vehiclePagination = data
    },
    SET_VEHICLES (state, data) {
      state.vehicles = data
    },
    SET_VEHICLE (state, data) {
      state.vehicle = data
    },
    SET_ALL_VEHICLE_STATUS (state, data) {
      state.allStatus = data
    },
    SET_ALL_VEHICLE_TYPES (state, data) {
      state.allVehicleTypes = data
    },
    SET_VEHICLE_TYPE (state, data) {
      state.vehicleType = data
    },
    SET_ALL_FUEL_TYPES (state, data) {
      state.allFuelTypes = data
    },
    SET_FUEL_TYPE (state, data) {
      state.fuelType = data
    },
    SET_ALL_VEHICLE_MODELS (state, data) {
      state.allVehicleModels = data
    },
    SET_VEHICLE_MODEL (state, data) {
      state.vehicleModel = data
    },
    SET_VEHICLE_DETAILS (state, data) {
      state.vehicleDetails = {
        // ...state.vehicle.VehicleIdentification
        id: data.id,
        name: data.name,
        vin: data.vin,
        licensePlate: data.licensePlate,
        vehicleTypeId: data.vehicleTypeId,
        vehicleModelId: data.vehicleModel,
        trim: data.trim,
        registrationRegion: data.registrationRegion,
        photo: data.photo
      }
    },
    SET_VEHICLE_SPECIFICATIONS (state, data) {
      state.vehicleSpecifications = data
    },
    SET_VEHICLE_ASSIGNMENTS (state, data) {
      state.allVehicleAssignments = data
    },
    SET_VEHICLES_ASSIGNMENT_PAGINATION (state, data) {
      state.assignmentsPagination = data
    },
    SET_ALL_INSPECTIONS (state, data) {
      state.allInspections = data
    },
    SET_INSPECTION_PAGINATION (state, data) {
      state.inspectionPagination = data
    },
    SET_TYPES_PAGINATION (state, data) {
      state.typesPagination = data
    },
    SET_ALL_VEHICLE_MAKES (state, data) {
      state.allVehicleMakes = data
    },
    SET_MAKES_PAGINATION (state, data) {
      state.makesPagination = data
    }
  },
  getters: {
    vehicleIdentification: state => {
      return {
        // ...state.vehicle.VehicleIdentification
        id: state.vehicle.id,
        name: state.vehicle.name,
        vin: state.vehicle.vin,
        licensePlate: state.vehicle.licensePlate,
        vehicleTypeId: state.vehicle.vehicleTypeId,
        vehicleModelId: state.vehicle.vehicleModel,
        trim: state.vehicle.trim,
        registrationRegion: state.vehicle.registrationRegion,
        photo: state.vehicle.photo
      }
    },
    vehicleClassification: state => {
      return {
        ...state.vehicle.VehicleClassification
        // vehicleStatusId: state.vehicle.vehicleStatusId,
        // groupId: state.vehicle.groupId,
        // operatorAccountId: state.vehicle.operatorAccountId,
        // ownership: state.vehicle.ownership
      }
    },
    vehicleAdditionalInfo: state => {
      return {
        ...state.vehicle.VehicleAdditionalDetail
        // color: state.vehicle.color,
        // bodyType: state.vehicle.bodyType,
        // bodySubType: state.vehicle.bodySubType,
        // msrp: state.vehicle.msrp,
        // linkedVehicles: state.vehicle.linkedVehicles
      }
    },
    vehicleDimensions: state => {
      return {
        width: state.vehicleSpecifications.width,
        height: state.vehicleSpecifications.height,
        length: state.vehicleSpecifications.length,
        interiorVolume: state.vehicleSpecifications.interiorVolume,
        passengerVolume: state.vehicleSpecifications.passengerVolume,
        cargoVolume: state.vehicleSpecifications.cargoVolume,
        groudClearance: state.vehicleSpecifications.groudClearance,
        bedLength: state.vehicleSpecifications.bedLength
      }
    }
  },
  actions: {
    // vehicle status actions
    async deleteVehicleStatus ({ dispatch }, data) {
      try {
        const response = await Api().delete(`/vehicles/status/${data.id}`, data)
        if (response.data.message === 'success') {
          dispatch('getAllVehicleStatus')
          return 'success'
        }
      } catch (e) {
        console.log(e)
        return e.response.data
      }
    },
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
    // vehicle make actions
    async searchMake ({ dispatch }, data) {
      try {
        const response = await Api().post('/vehicles/search-vehicle-make', data)
        if (response.data.message === 'success') {
          dispatch('getVehicleMakes', { page: 1 })
          return response.data.makes.data
        }
      } catch (e) {
        return e.response.data
      }
    },
    async addVehicleMake ({ dispatch }, data) {
      try {
        const response = await Api().post('/vehicles/vehicle-make', data)
        if (response.data.message === 'success') {
          dispatch('getVehicleMakes', { page: 1 })
          return response.data.type[0]
        }
      } catch (e) {
        return e.response.data
      }
    },
    async getVehicleMakes ({ commit }, data) {
      try {
        const response = await Api().get(`/vehicles/vehicle-makes/${data.page}`)
        if (response.data.message === 'success') {
          commit('SET_ALL_VEHICLE_MAKES', response.data.makes.data)
          commit('SET_MAKES_PAGINATION', {
            firstPage: response.data.makes.firstPage,
            lastPage: response.data.makes.lastPage,
            currentPage: response.data.makes.currentPage
          })
          return 'success'
        }
      } catch (e) {
        return e.response.data
      }
    },
    // vehicle types actions
    async getVehicleTypes ({ commit }, data) {
      try {
        const response = await Api().get(`/vehicles/types/${data.page}`)
        if (response.data.message === 'success') {
          commit('SET_ALL_VEHICLE_TYPES', response.data.types.data)
          commit('SET_TYPES_PAGINATION', {
            firstPage: response.data.types.firstPage,
            lastPage: response.data.types.lastPage,
            currentPage: response.data.types.currentPage
          })
          return 'success'
        }
      } catch (e) {
        return e.response.data
      }
    },
    async getVehicleType ({ commit }, id) {
      try {
        const response = await Api().get(`/vehicles/type/${id}`)
        if (response.data.message === 'success') {
          commit('SET_VEHICLE_TYPE', response.data.type)
          return 'success'
        }
      } catch (e) {
        return e.response.data
      }
    },
    async addVehicleType ({ dispatch }, data) {
      try {
        const response = await Api().post('/vehicles/type', data)
        if (response.data.message === 'success') {
          dispatch('getVehicleTypes', { page: 1 })
          return response.data.type[0]
        }
      } catch (e) {
        return e.response.data
      }
    },
    async updateVehicleType ({ dispatch, commit }, data) {
      try {
        const response = await Api().put(`/vehicles/type/${data.id}`, data)
        if (response.data.message === 'success') {
          dispatch('getVehicleTypes')
          commit('SET_VEHICLE_TYPE', response.data.type)
          return 'success'
        }
      } catch (e) {
        return e.response.data
      }
    },
    async deleteVehicleType ({ dispatch, commit }, data) {
      try {
        const response = await Api().delete(`/vehicles/type/${data.id}`, data)
        if (response.data.message === 'success') {
          dispatch('getVehicleTypes')
          return 'success'
        }
      } catch (e) {
        return e.response.data
      }
    },
    // vehicle models actions
    async getAllVehicleModels ({ commit }) {
      try {
        const response = await Api().get('/vehicles/models')
        if (response.data.message === 'success') {
          commit('SET_ALL_VEHICLE_MODELS', response.data.models)
          return 'success'
        }
      } catch (e) {
        return e.response.data
      }
    },
    async getVehicleModel ({ commit }, id) {
      try {
        const response = await Api().get(`/vehicles/model/${id}`)
        if (response.data.message === 'success') {
          commit('SET_VEHICLE_MODEL', response.data.type)
          return 'success'
        }
      } catch (e) {
        return e.response.data
      }
    },
    async addVehicleModel ({ dispatch }, data) {
      try {
        const response = await Api().post('/vehicles/model', data)
        if (response.data.message === 'success') {
          dispatch('getAllVehicleModels')
          return 'success'
        }
      } catch (e) {
        return e.response.data
      }
    },
    async updateVehicleModel ({ dispatch, commit }, data) {
      try {
        const response = await Api().put(`/vehicles/model/${data.id}`, data)
        if (response.data.message === 'success') {
          dispatch('getAllVehicleModels')
          commit('SET_VEHICLE_MODEL', response.data.type)
          return 'success'
        }
      } catch (e) {
        return e.response.data
      }
    },
    async deleteVehicleModel ({ dispatch, commit }, data) {
      try {
        const response = await Api().delete(`/vehicles/model/${data.id}`, data)
        if (response.data.message === 'success') {
          dispatch('getAllVehicleModels')
          return 'success'
        }
      } catch (e) {
        return e.response.data
      }
    },
    // fuel types actions
    async getFuelTypes ({ commit }) {
      try {
        const response = await Api().get('/vehicles/fuel-types')
        if (response.data.message === 'success') {
          commit('SET_ALL_FUEL_TYPES', response.data.fuelTypes)
          return 'success'
        }
      } catch (e) {
        return e.response.data
      }
    },
    async getFuelType ({ commit }, id) {
      try {
        const response = await Api().get(`/vehicles/fuel-type/${id}`)
        if (response.data.message === 'success') {
          commit('SET_FUEL_TYPE', response.data.type)
          return 'success'
        }
      } catch (e) {
        return e.response.data
      }
    },
    async addFuelType ({ dispatch }, data) {
      try {
        const response = await Api().post('/vehicles/fuel-type', data)
        if (response.data.message === 'success') {
          dispatch('getFuelTypes')
          return 'success'
        }
      } catch (e) {
        return e.response.data
      }
    },
    async updateFuelType ({ dispatch, commit }, data) {
      try {
        const response = await Api().put(`/vehicles/fuel-type/${data.id}`, data)
        if (response.data.message === 'success') {
          dispatch('getFuelTypes')
          commit('SET_FUEL_TYPE', response.data.type)
          return 'success'
        }
      } catch (e) {
        return e.response.data
      }
    },
    async deleteFuelType ({ dispatch, commit }, data) {
      try {
        const response = await Api().delete(`/vehicles/fuel-type/${data.id}`, data)
        if (response.data.message === 'success') {
          dispatch('getFuelTypes')
          return 'success'
        }
      } catch (e) {
        return e.response.data
      }
    },
    // vehicle Assignment Actions
    async getAllVehicleAssignments ({ commit }, data) {
      try {
        const response = await Api().get(`/vehicles/assign-vehicles/${data.page}`)
        if (response.data.message === 'success') {
          commit('SET_VEHICLE_ASSIGNMENTS', response.data.assignments.data)
          commit('SET_VEHICLES_ASSIGNMENT_PAGINATION', {
            firstPage: response.data.assignments.firstPage,
            lastPage: response.data.assignments.lastPage,
            currentPage: response.data.assignments.currentPage
          })
          return 'success'
        }
      } catch (e) {
        return e.response.data
      }
    },
    async addVehicleAssignment ({ dispatch }, data) {
      try {
        const response = await Api().post('vehicles/assign-vehicle', data)
        if (response.data.message === 'success') {
          // commit('EDIT_MODE', true)
          dispatch('getAllVehicleAssignments', { page: 1 })
          return 'success'
        }
      } catch (e) {
        console.log(e)
        return 'error'
      }
    },
    // addVehicleAssignment
    // vehicles actions
    async getVehicle ({ commit }, id) {
      try {
        const response = await Api().get(`/vehicles/vehicle/${id}`)
        if (response.data.message === 'success') {
          commit('SET_VEHICLE', response.data.vehicle)
          commit('SET_VEHICLE_DETAILS', response.data.vehicle)
          commit('SET_VEHICLE_SPECIFICATIONS', response.data.vehicle.VehicleSpecification)
          return 'success'
        }
      } catch (e) {
        return e.response.data
      }
    },
    async checkVehicleName ({ commit }, data) {
      try {
        const response = await Api().post('/vehicles/check-vehicle-name', data)
        if (response.data.message === 'success') {
          return response.data.isExist
        } else {
          return null
        }
      } catch (e) {
        return null
      }
    },
    async getAllVehicles ({ commit }, data) {
      try {
        const response = await Api().get(`/vehicles/vehicles/${data.page}`)
        if (response.data.message === 'success') {
          commit('SET_VEHICLES', response.data.vehicles.data)
          commit('SET_VEHICLES_PAGINATION', {
            firstPage: response.data.vehicles.firstPage,
            lastPage: response.data.vehicles.lastPage,
            currentPage: response.data.vehicles.currentPage
          })
          return 'success'
        }
      } catch (e) {
        return e.response.data
      }
    },
    async getAllUnassignedVehicles ({ commit }, data) {
      try {
        const response = await Api().get(`/vehicles/unassign-vehicles/${data.page}`)
        if (response.data.message === 'success') {
          commit('SET_VEHICLES', response.data.vehicles.data)
          commit('SET_VEHICLES_PAGINATION', {
            firstPage: response.data.vehicles.firstPage,
            lastPage: response.data.vehicles.lastPage,
            currentPage: response.data.vehicles.currentPage
          })
          return 'success'
        }
      } catch (e) {
        return e.response.data
      }
    },
    async getAllAssignedVehicles ({ commit }, data) {
      try {
        const response = await Api().get(`/vehicles/assign-vehicles/${data.page}`)
        if (response.data.message === 'success') {
          commit('SET_VEHICLES', response.data.vehicles.data)
          commit('SET_VEHICLES_PAGINATION', {
            firstPage: response.data.vehicles.firstPage,
            lastPage: response.data.vehicles.lastPage,
            currentPage: response.data.vehicles.currentPage
          })
          return 'success'
        }
      } catch (e) {
        return e.response.data
      }
    },
    async getAllArchivedVehicles ({ commit }, data) {
      try {
        const response = await Api().get(`/vehicles/archive/${data.page}`)
        if (response.data.message === 'success') {
          commit('SET_VEHICLES', response.data.vehicles.data)
          commit('SET_VEHICLES_PAGINATION', {
            firstPage: response.data.vehicles.firstPage,
            lastPage: response.data.vehicles.lastPage,
            currentPage: response.data.vehicles.currentPage
          })
          return 'success'
        }
      } catch (e) {
        return e.response.data
      }
    },
    async addVehicleDetails ({ commit }, data) {
      try {
        const response = await Api().post('vehicles/vehicle-details', data)
        if (response.data.message === 'success') {
          // commit('EDIT_MODE', true)
          commit('SET_VEHICLE_DETAILS', response.data.vehicle)
          return 'success'
        }
      } catch (e) {
        console.log(e)
        return 'error'
      }
    },
    async updateVehicleDetails ({ commit, rootState }, data) {
      try {
        const response = await Api().put(`vehicles/vehicle-details/${rootState.vehicles.vehicle.id}`, data)
        if (response.data.message === 'success') {
          commit('EDIT_MODE', true)
          return 'success'
        }
      } catch (e) {
        console.log(e)
        return 'error'
      }
    },
    async addVehicleSpecifications ({ commit }, data) {
      try {
        const response = await Api().post('/vehicle-specs', data)
        if (response.data.message === 'success') {
          commit('EDIT_MODE', true)
          return 'success'
        }
      } catch (e) {
        console.log(e)
        return 'error'
      }
    },
    async updateVehicleSpecifications ({ commit, rootState }, data) {
      try {
        const response = await Api().put(`vehicles/vehicle-specs/${rootState.vehicles.vehicleDetails.id}`, data)
        if (response.data.message === 'success') {
          commit('EDIT_MODE', true)
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
