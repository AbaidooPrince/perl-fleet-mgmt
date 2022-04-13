<template>
  <div>
    <v-card elevation="1">
      <v-card-text>
        <div class="d-flex align-center justify-content-between">
        <h6 class="font-weight-bold mb-0">Dimensions</h6>
        <v-btn :to="{ name: 'EditVehicleSpecifications', params: { vehicleID: this.vehicle.id }}" color="" depressed outlined x-small>
          <v-icon small left>mdi-pencil</v-icon> Edit
        </v-btn>
        </div>
        <v-divider class="mt-2"></v-divider>
        <div>
          <v-row>
            <v-col class="py-0 text-right" cols="6" md="6">
              <div class="text-muted">Length</div>
            </v-col>
            <v-col class="py-0 justify-end" cols="6" md="6">
              <div>{{ vehicleSpecifications  ? `${vehicleSpecifications.length} ${units.length}` : ''}}</div>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row>
            <v-col class="py-0 text-right" cols="6" md="6">
              <div class="text-muted">Width</div>
            </v-col>
            <v-col class="py-0 justify-end" cols="6" md="6">
              <div>{{ vehicleSpecifications  ? `${vehicleSpecifications.width} ${units.length}` : ''}}</div>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row>
            <v-col class="py-0 text-right" cols="6" md="6">
              <div class="text-muted">Height</div>
            </v-col>
            <v-col class="py-0 justify-end" cols="6" md="6">
              <div>{{ vehicleSpecifications  ? `${vehicleSpecifications.height} ${units.length}` : ''}}</div>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row>
            <v-col class="py-0 text-right" cols="6" md="6">
              <div class="text-muted">Interior Volume</div>
            </v-col>
            <v-col class="py-0 justify-end" cols="6" md="6">
              <div>{{ vehicleSpecifications  ? `${vehicleSpecifications.interiorVolume} ${units.volume}` : ''}}</div>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row>
            <v-col class="py-0 text-right" cols="6" md="6">
              <div class="text-muted">Passenger Volume</div>
            </v-col>
            <v-col class="py-0 justify-end" cols="6" md="6">
              <div>{{ vehicleSpecifications  ? `${vehicleSpecifications.passengerVolume}` : ''}}</div>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row>
            <v-col class="py-0 text-right" cols="6" md="6">
              <div class="text-muted">Cargo Volume</div>
            </v-col>
            <v-col class="py-0 justify-end" cols="6" md="6">
              <div>{{ vehicleSpecifications  ? `${vehicleSpecifications.cargoVolume} ${units.volume}` : ''}}</div>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row>
            <v-col class="py-0 text-right" cols="6" md="6">
              <div class="text-muted">Ground Clearance</div>
            </v-col>
            <v-col class="py-0 justify-end" cols="6" md="6">
              <div>{{ vehicleSpecifications  ? `${vehicleSpecifications.groundClearance} ${units.length}` : ''}} </div>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row>
            <v-col class="py-0 text-right" cols="6" md="6">
              <div class="text-muted">Bed length</div>
            </v-col>
            <v-col class="py-0 justify-end" cols="6" md="6">
              <div>{{ vehicleSpecifications  ? `${vehicleSpecifications.bedLength} ${units.length}` : ''}}</div>
            </v-col>
          </v-row>
        </div>
      </v-card-text>
      <v-divider class="mt-0"></v-divider>
    </v-card>
  </div>
</template>

<script>import common from '../../../../mixins/common'

export default {
  name: 'Details',
  mixins: [common],
  computed: {
    vehicleSpecifications: {
      get () {
        return this.vehicle.VehicleSpecitfication || null
      }
    },
    vehicle: {
      get () {
        return this.$store.state.vehicles.vehicle
      }
    }
  }

}
</script>

<style>

</style>
