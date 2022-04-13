<template>
  <div>
    <v-card elevation="1">
      <v-card-text>
        <div class="d-flex align-center justify-content-between">
        <h6 class="font-weight-bold mb-0">Performance</h6>
        <v-btn color="" depressed outlined x-small>
          <v-icon small left>mdi-pencil</v-icon> Edit
        </v-btn>
        </div>
        <v-divider class="mt-2"></v-divider>
        <div>
          <v-row>
            <v-col class="py-0 text-right" cols="6" md="6">
              <div class="text-muted">Towing Capacity</div>
            </v-col>
            <v-col class="py-0 justify-end" cols="6" md="6">
              <div>{{ vehicle.vehicleSpecifications  ? `${vehicle.vehicleSpecifications.towingCapacity} ${units.length}` : ''}}</div>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row>
            <v-col class="py-0 text-right" cols="6" md="6">
              <div class="text-muted">Max. Payload</div>
            </v-col>
            <v-col class="py-0 justify-end" cols="6" md="6">
              <div>{{ vehicle.VehicleClassification.maxPayload ? vehicle.VehicleClassification.maxPayload : '' }}</div>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row>
            <v-col class="py-0 text-right" cols="6" md="6">
              <div class="text-muted">EPA City</div>
            </v-col>
            <v-col class="py-0 justify-end" cols="6" md="6">
              <div>{{ vehicle.VehicleClassification.epaCity ? vehicle.VehicleClassification.epaCity : ''}}</div>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row>
            <v-col class="py-0 text-right" cols="6" md="6">
              <div class="text-muted">EPA Highway</div>
            </v-col>
            <v-col class="py-0 justify-end" cols="6" md="6">
              <div>{{ vehicle.VehicleClassification ? vehicle.VehicleClassification.epaHighway : '' }}</div>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row>
            <v-col class="py-0 text-right" cols="6" md="6">
              <div class="text-muted">Epa Combined</div>
            </v-col>
            <v-col class="py-0 justify-end" cols="6" md="6">
              <div>{{ vehicle.VehicleClassification.vehicleStatusId ? vehicle.VehicleClassification.vehicleStatusId : ''}}</div>
            </v-col>
          </v-row>
        </div>
      </v-card-text>
      <v-divider class="mt-0"></v-divider>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'Performance',
  computed: {
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
