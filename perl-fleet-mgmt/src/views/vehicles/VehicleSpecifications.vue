<template>
  <div>
    <dimensions :form="dimensionsForm"></dimensions>
    <weight :form="weightForm"></weight>
    <performance :form="performanceForm"></performance>
    <fuel-economy :form="fuelEconomyForm"></fuel-economy>
    <engine :form="engineForm"></engine>
    <transmission :form="transmissionForm"></transmission>
    <wheels-tyres :form="wheelsTiresForms"></wheels-tyres>
    <fuel :form="fuelForm"></fuel>
    <oil :form="oilForm"></oil>
      <v-row align="center" justify="center">
        <v-col order-sm="2" cols="12" md="3" sm="3">
          <v-btn plain color="primary">Cancel
          </v-btn>
        </v-col>
        <v-col order-sm="3" cols="12" md="8" sm="9" class="text-right" justify="end">
          <div class="">
          <v-btn class="mx-2" outlined color="primary">Save &amp; Add Another
          </v-btn>
          <v-btn @click="saveOption" depressed color="primary">Save Vehicle
          </v-btn>
          </div>
        </v-col>
      </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Transmission from '../../components/vehicle/specifications/Transmission.vue'
import Engine from '../../components/vehicle/specifications/Engine.vue'
import Dimensions from '../../components/vehicle/specifications/Dimensions.vue'
import Weight from '../../components/vehicle/specifications/Weight.vue'
import Performance from '../../components/vehicle/specifications/Performance.vue'
import FuelEconomy from '../../components/vehicle/specifications/FuelEconomy.vue'
import WheelsTyres from '../../components/vehicle/specifications/WheelsTyres.vue'
import common from '../../mixins/common'
import vehicles from '../../store/modules/vehicles'
import Fuel from '../../components/vehicle/specifications/Fuel.vue'
import Oil from '../../components/vehicle/specifications/Oil.vue'
export default {
  components: { Dimensions, Weight, Performance, FuelEconomy, Engine, Transmission, WheelsTyres, Fuel, Oil },
  name: 'VehicleSpecifications',
  mixins: [common, vehicles],
  data () {
    return {
      // eslint-disable-next-line no-undef
      dimensionsForm: new Form({
        width: '',
        height: '',
        length: '',
        interiorVolume: '',
        passengerVolume: '',
        cargoVolume: '',
        groudClearance: '',
        bedLength: ''
      }),
      // eslint-disable-next-line no-undef
      weightForm: new Form({
        curbWeight: '',
        grossVehicleWeight: ''
      }),
      // eslint-disable-next-line no-undef
      performanceForm: new Form({
        towingCapacity: '',
        maxPayload: ''
      }),
      // eslint-disable-next-line no-undef
      fuelEconomyForm: new Form({
        epaCity: '',
        epaCombined: '',
        epaHighway: ''
      }),
      // eslint-disable-next-line no-undef
      engineForm: new Form({
        engineSummary: '',
        engineBrand: '',
        aspiration: '',
        blockType: '',
        bore: '',
        camType: '',
        compression: '',
        cylinders: '',
        displacement: '',
        fuelInduction: '',
        maxHP: '',
        maxTorque: '',
        redlineRpm: '',
        stroke: '',
        valves: ''
      }),
      // eslint-disable-next-line no-undef
      transmissionForm: new Form({
        transimissionSummary: '',
        transmissionBrand: '',
        transmissionType: '',
        transmissionGears: ''
      }),
      // eslint-disable-next-line no-undef
      wheelsTiresForms: new Form({
        driveType: '',
        brakeSystem: '',
        frontTrackWidth: '',
        rearTrackWidth: '',
        wheelBase: '',
        frontWheelDiameter: '',
        rearWheelDiameter: '',
        rearAxle: '',
        frontTireType: '',
        rearTireType: '',
        frontTirePsi: '',
        rearTirePsi: ''
      }),
      // eslint-disable-next-line no-undef
      fuelForm: new Form({
        fuelType: '',
        fuelQuality: '',
        fuelTank1: '',
        fuelTank2: ''
      }),
      // eslint-disable-next-line no-undef
      oilForm: new Form({
        oilCapacity: ''
      })
    }
  },
  watch: {
    saving (val) {
      // console.log('new val', val)
      if (val === true) {
        this.addVehicleSpecification()
      }
    },
    updating (val) {
      if (val === true) {
        this.updateVehicleSpecification()
      }
    }
  },
  computed: {
    ...mapGetters(
      { vehicleDimensions: 'vehicles/vehicleDimensions' }
    ),
    ...mapGetters(
      { vehicleWeight: 'vehicles/vehicleWeight' }
    ),
    ...mapGetters(
      { vehiclePerformance: 'vehicles/vehiclePerformance' }
    ),
    ...mapGetters(
      { vehicleFuelEconomy: 'vehicles/vehicleFuelEconomy' }
    ),
    ...mapGetters(
      { vehicleEngine: 'vehicles/vehicleEngine' }
    ),
    ...mapGetters(
      { vehicleTransmission: 'vehicles/vehicleTransmission' }
    ),
    ...mapGetters(
      { vehicleWheelsTires: 'vehicles/vehicleWheelsTires' }
    ),
    ...mapGetters(
      { vehicleFuel: 'vehicles/vehicleFuel' }
    ),
    ...mapGetters(
      { vehicleOil: 'vehicles/vehicleOil' }
    )
  },
  methods: {
    fillOption () {
      if (this.editMode) {
        this.dimensionsForm.fill(this.vehicleDimensions)
        this.weightForm.fill(this.vehicleWeight)
        this.performanceForm.fill(this.vehiclePerformance)
      }
    },
    async addVehicleSpecification () {
      // if (!this.$refs.weightForm.validate()) return
      this.processing = true
      const data = {
        ...this.dimensionsForm,
        ...this.weightForm,
        ...this.performanceForm,
        ...this.fuelEconomyForm,
        ...this.engineForm,
        ...this.transmissionForm,
        ...this.wheelsTiresForms,
        ...this.fuelForm,
        ...this.oilForm
      }
      const response = await this.$store.dispatch('vehicles/addVehicleSpecifications', data)
      console.log(response)
      if (response === 'success') {
        this.processing = false
        this.$store.commit('TRIGGER_SAVE', false)
        this.$store.dispatch('showSnackBar', { error: false, message: 'Vehicle added successfully!' })
        // this.$router.push({ name: 'UserDashboard', params: { userRouteID: user.computed.userRouteID } })
      } else if (response === 'error') {
        this.$store.commit('TRIGGER_SAVE', false)
        this.$store.dispatch('showSnackBar', { error: true, message: 'Error adding vehicle!' })
        this.processing = false
        console.log('error', response)
      } else {
        this.$store.commit('TRIGGER_SAVE', false)
        this.$store.dispatch('showSnackBar', { error: true, message: 'Error adding vehicle!' })
        this.processing = false
      }
    },
    async updateVehicleSpecification () {
      // if (!this.$refs.weightForm.validate()) return
      this.processing = true
      const data = {
        ...this.dimensionsForm,
        ...this.weightForm,
        ...this.performanceForm,
        ...this.fuelEconomyForm,
        ...this.engineForm,
        ...this.transmissionForm,
        ...this.wheelsTiresForms,
        ...this.fuelForm,
        ...this.oilForm
      }
      const response = await this.$store.dispatch('vehicles/updateVehicleSpecifications', data)
      console.log(response)
      if (response === 'success') {
        this.processing = false
        this.$store.commit('TRIGGER_UPDATE', false)
        this.$store.dispatch('showSnackBar', { error: false, message: 'Vehicle updated successfully!' })
        // this.$router.push({ name: 'UserDashboard', params: { userRouteID: user.computed.userRouteID } })
      } else if (response === 'error') {
        this.$store.commit('TRIGGER_UPDATE', false)
        this.$store.dispatch('showSnackBar', { error: true, message: 'Error uupdating vehicle!' })
        this.processing = false
        console.log('error', response)
      } else {
        this.$store.commit('TRIGGER_UPDATE', false)
        this.$store.dispatch('showSnackBar', { error: true, message: 'Error updating vehicle!' })
        this.processing = false
      }
    },
    saveOption () {
    }
  }

}
</script>

<style>

</style>
