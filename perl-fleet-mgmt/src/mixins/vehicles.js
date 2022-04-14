export default {
  data () {
    return {
      transmissionTypes: [
        'Automatic',
        'Continously Variable'
      ],
      aspirations: [
        'Naturally Aspirated',
        'Turbocharger',
        'Twin Turbocharger'
      ],
      blockTypes: [
        'I',
        'V'
      ],
      camType: [
        'DOHC',
        'OHV'
      ],
      fuelInductions: [
        'Common Rail Direct Injection',
        'Sequential Multiport Fuel Injection',
        'Sequential Port Fuel Injection'
      ]
    }
  },
  methods: {
    getVehicleType (id) {
      const name = this.vehicleTypes.filter(type => type.id === id)
      if (name.length) {
        return name[0].name
      }
    },
    getVehicleModel (id) {
      const name = this.vehicleModels.filter(type => type.id === id)
      if (name.length) {
        return name[0].name
      }
    },
    getVehicleStatus (id) {
      return this.vehicleStatus.filter(status => status.id === id)[0]
    }
  },
  computed: {
    allVehicleModels: {
      get () {
        return this.$store.state.vehicles.allVehicleModels
      }
    },
    vehicleTypes: {
      get () {
        return this.$store.state.vehicles.allVehicleTypes
      }
    },
    vehicleModels: {
      get () {
        return this.$store.state.vehicles.allVehicleModels
      }
    },
    vehiclePagination: {
      get () {
        return this.$store.state.vehicles.vehiclePagination
      }
    },
    vehicleStatus: {
      get () {
        return this.$store.state.vehicles.allStatus
      }
    },
    vehicle: {
      get () {
        return this.$store.state.vehicles.vehicle
      }
    }
  }
}
