<template>
  <div>
    <vehicle-maintenance-form :form="maintenanceForm"></vehicle-maintenance-form>

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
import VehicleMaintenanceForm from '../../components/vehicle/VehicleMaintenanceForm.vue'
export default {
  components: { VehicleMaintenanceForm },
  name: 'VehicleMaintenance',
  data () {
    return {
      // eslint-disable-next-line no-undef
      maintenanceForm: new Form({
        maintenance: 0,
        type: ''
      })
    }
  },
  methods: {
    saveOption () {
    }
  }

}
</script>

<style>

</style>
