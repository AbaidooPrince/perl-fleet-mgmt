export default
{
  methods: {
    getData () {
      this.$store.dispatch('users/getAllGroups', { paeg: 1 })
      this.$store.dispatch('vehicles/getVehicleMakes', { page: 1 })
      this.$store.dispatch('users/getAllRoles', { page: 1 })
      this.$store.dispatch('users/getAllUsers', { page: 1 })
      this.$store.dispatch('users/getAllOperators', { page: 1 })
      this.$store.dispatch('vehicles/getAllVehicleStatus', { page: 1 })
      this.$store.dispatch('vehicles/getVehicleTypes', { page: 1 })
      this.$store.dispatch('vehicles/getAllVehicleModels', { page: 1 })
      this.$store.dispatch('vehicles/getFuelTypes', { page: 1 })
      this.$store.dispatch('vehicles/getAllVehicles', { page: 1 })
    }
  },
  created () {
    this.getData()
  }
}
