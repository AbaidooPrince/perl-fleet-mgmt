<template>
  <div>
    <identification
      @set-file-url="setFile" :form="identificationForm"></identification>
    <classification :form="classificationForm"></classification>
    <additional-info :form="additionalDetailsForm"></additional-info>

      <!-- <v-row align="center" justify="center">
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
      </v-row> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Identification from '../../components/vehicle/details/Identification.vue'
import Classification from '../../components/vehicle/details/Classification.vue'
import AdditionalInfo from '../../components/vehicle/details/AdditionalInfo.vue'
import validation from '../../services/validation'
import common from '../../mixins/common'
import vehicles from '../../mixins/vehicles'
export default {
  components: { Identification, Classification, AdditionalInfo },
  props: ['save', 'update', 'editMode'],
  name: 'VehicleDetails',
  mixins: [common, vehicles],
  data () {
    return {
      ...validation,
      processing: false,
      // eslint-disable-next-line no-undef
      identificationForm: new Form({
        id: '',
        name: '',
        vin: '',
        licensePlate: '',
        vehicleTypeId: null,
        year: null,
        vehicleMakeId: null,
        vehicleModelId: null,
        trim: '',
        registrationRegion: null,
        photo: null
      }),
      // eslint-disable-next-line no-undef
      classificationForm: new Form({
        vehicleStatusId: null,
        groupId: null,
        operatorAccountId: null,
        ownership: null
      }),
      // eslint-disable-next-line no-undef
      additionalDetailsForm: new Form({
        color: '',
        bodyType: '',
        bodySubType: '',
        msrp: '',
        linkedVehicles: []
      })
    }
  },
  computed: {
    canLeaveRoute: {
      get () {
        return this.$store.state.canLeaveRoute
      }
    },
    formEditMode: {
      get () {
        return this.$store.state.formEditMode
      }
    },
    ...mapGetters(
      { vehicleIdentification: 'vehicles/vehicleIdentification' }
    ),
    ...mapGetters(
      { vehicleClassification: 'vehicles/vehicleClassification' }
    ),
    ...mapGetters(
      { vehicleAdditionalInfo: 'vehicles/vehicleAdditionalInfo' }
    )
  },
  watch: {
    identificationForm: {
      handler (newValue, oldValue) {
        if (newValue !== oldValue) {
          console.log('cant')
          this.$store.commit('CAN_LEAVE_ROUTE', false)
        }
      }
    },
    saving (val) {
      // console.log('new val', val)
      if (val === true) {
        this.addVehicleDetails()
      }
    },
    updating (val) {
      if (val === true) {
        this.updateVehicleDetails()
      }
    }
  },
  methods: {
    setFile (e) {
      this.identificationForm.photo = e
    },
    fillForm () {
      this.identificationForm.fill(this.vehicleIdentification)
      this.classificationForm.fill(this.vehicleClassification)
      this.additionalDetailsForm.fill(this.vehicleAdditionalInfo)
    },
    fillOption () {
      this.$store.commit('CAN_LEAVE_ROUTE', false)
      if (this.editMode) {
        this.fillForm()
      }
    },
    async addVehicleDetails () {
      // if (!this.$refs.classificationForm.validate()) return
      this.processing = true
      const data = {
        ...this.identificationForm,
        ...this.classificationForm,
        ...this.additionalDetailsForm
      }
      const response = await this.$store.dispatch('vehicles/addVehicleDetails', data)
      console.log(response)
      if (response === 'success') {
        this.processing = false
        // this.$store.commit('vehicles/SET_VEHICLE_DETAILS', response.data.vehicle)
        this.$store.commit('EDIT_MODE', true)
        this.$store.commit('TRIGGER_SAVE', false)
        this.$store.commit('CAN_LEAVE_ROUTE', true)
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
    async updateVehicleDetails () {
      // if (!this.$refs.classificationForm.validate()) return
      this.processing = true
      const data = {
        id: this.vehicleIdentification.id,
        ...this.identificationForm,
        ...this.classificationForm,
        ...this.additionalDetailsForm
      }
      const response = await this.$store.dispatch('vehicles/updateVehicleDetails', data)
      console.log(response)
      if (response === 'success') {
        this.processing = false
        this.$store.commit('TRIGGER_UPDATE', false)
        this.$store.commit('CAN_LEAVE_ROUTE', true)
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
    },
    mounted () {
      // eslint-disable-next-line no-undef
      // Fire.$on('add-vehicle', () => {
      //   alert('save')
      // })
    }
  },
  beforeRouteLeave (to, from, next) {
    if ((!this.canLeaveRoute)) {
      const answer = window.confirm('Do you really want to leave? You might have unsaved changes!')
      if (!answer) return false
      if (answer) {
        this.$store.commit('CAN_LEAVE_ROUTE', true)
        next()
      }
    } else {
      next()
    }
  },
  created () {
    this.fillOption()
  }

}
</script>

<style>

</style>
