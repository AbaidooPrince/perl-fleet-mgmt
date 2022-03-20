<template>
  <div>
    <v-toolbar absolute height="70" extension-height="130" flat class="new-item-app-bar">
      <div class="">
        <div class="mb-4">
          <small>
            <router-link to="{name: 'VehicleList'}">
              <v-icon size="20" left> mdi-chevron-left
              </v-icon> Vehicle List
            </router-link>
          </small>
          <span>
            /  <label  class="small" for=""> Vehicle Name</label>
          </span>
        </div>
        <div>
       <!-- <h4 class="font-weight-bold"> {{ title ? title  : 'Page Title'}} </h4> -->
        </div>
      </div>
      <v-spacer></v-spacer>
      <div class="d-flex justify-space-around">
        <div class="px-3">
          <!-- <v-btn @click="cancelAction" plain small color="primary">Cancel</v-btn> -->
        </div>
        <div class="px-3">
          <v-btn depressed small
          :disabled="processing"
          @click="editVehicle"
          color="primary"
          >
          <v-icon left small>mdi-pencil
          </v-icon>Edit Vehicle
          </v-btn>
        </div>
      </div>
      <template v-slot:extension>
      <v-row align="center" justify-md="center">
        <v-col cols="12" md="1" class="pt-0 pb-0 align-self-right">
          <v-avatar rounded="lg" size="70">
            <v-img src="../../assets/fleet1.jpg"></v-img>
          </v-avatar>
        </v-col>
        <v-col cols="12" md="9" class="pt-0 pb-0">
          <div class="h2 mb-0 font-weight-bold"> {{ vehicle.name ? vehicle.name : ''}}
          </div>
          <div class="grey--text small">
            <span>{{ getVehicleType(vehicle.vehicleTypeId) }} </span>
            <span>. 2018 Toyota Prius</span>
            <span v-if="vehicle.vin">. {{ vehicle.vin }}</span>
            <span v-if="vehicle.licensePlate">. {{ vehicle.licensePlate }}</span>
          </div>
          <div class="d-flex w-auto text-muted">
            <div class="text-left">
              Active
            </div>
            <div>
              Group
            </div>
            <div>
              operator
            </div>
          </div>
        </v-col>
        <v-col cols="12" md="2" class="pt-0 pb-0">
          <v-card flat outlined>
            <v-card-text class="text-center pa-2">
              <div class="mb-2"> <small class="">SERIVCE REMINDERS</small>
              </div>
              <div class="d-flex justify-center justify-space-around">
                <div class="text-right grey--text h3">
                  2
                </div>
                <div>
                  <v-divider vertical></v-divider>
                </div>
                <div class="h3 orange--text"> 10
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" class="pa-0">
          <v-divider class="mb-0"></v-divider>
        </v-col>
      </v-row>
      </template>
    </v-toolbar>
    <!-- <v-divider class="my-0"></v-divider> -->
    <div class="mt-4">
      <v-container fluid class="bg-grey w-100">
        <v-row>
          <v-col cols="12" md="3" class="pt-0">
            <v-btn class="" color="success" depressed block>
              <v-icon>mdi-plus</v-icon>
              Quick Add</v-btn>
            <v-card class="pa-2 mt-2" elevation="0" outlined>
            <view-vehicle-menu></view-vehicle-menu>
            </v-card>
          </v-col>
          <v-col cols="12" md="9">
            <router-view></router-view>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div>
      <slot name="actions">
      </slot>
    </div>
  </div>
</template>

<script>
import ViewVehicleMenu from '../../components/vehicle/ViewVehicleMenu.vue'
import common from '../../mixins/common'
import vehicles from '../../mixins/vehicles'
export default {
  components: { ViewVehicleMenu },
  name: 'ViewVehicle',
  props: ['listPage', 'listLink', 'title', 'processing', 'userRouterID', 'vehicleID'],
  mixins: [vehicles, common],
  methods: {
    cancelAction () {
      this.$emit('cancel-action')
    },
    editVehicle () {
      this.$router.push({ name: 'EditVehicleDetails', params: { vehicleID: this.vehicle.id } })
      // this.$emit('add-action')
    },
    getVehicle () {
      this.$store.dispatch('vehicles/getVehicle', this.vehicleID)
    }
  },
  created () {
    this.getVehicle()
  }
}
</script>

<style scoped>
.new-item-app-bar {
  position: sticky;
  position: -webkit-sticky;
}

</style>
