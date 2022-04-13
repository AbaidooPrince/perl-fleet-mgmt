<template>
  <div>
    <v-card elevation="1">
      <v-card-text>
        <div class="d-flex align-center justify-content-between">
        <h6 class="font-weight-bold mb-0">Weight</h6>
        <v-btn color="" depressed outlined x-small>
          <v-icon small left>mdi-pencil</v-icon> Edit
        </v-btn>
        </div>
        <v-divider class="mt-2"></v-divider>
        <div>
          <v-row>
            <v-col class="py-0 text-right" cols="6" md="6">
              <div class="text-muted">Curb Weight</div>
            </v-col>
            <v-col class="py-0 justify-end" cols="6" md="6">
              <div>{{ vehicleSpecifications  ? `${vehicleSpecifications.curbWeight} ${units.weight}` : ''}}</div>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row>
            <v-col class="py-0 text-right" cols="6" md="6">
              <div class="text-muted">Gross Vehicle Weight Rating</div>
            </v-col>
            <v-col class="py-0 justify-end" cols="6" md="6">
              <div>{{ vehicleSpecifications  ? `${vehicleSpecifications.grossVehicleWeight} ${units.length}` : ''}}</div>
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
  name: 'Details',
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
