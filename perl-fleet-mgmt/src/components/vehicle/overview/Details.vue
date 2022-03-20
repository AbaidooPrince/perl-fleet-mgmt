<template>
  <div>
    <v-card elevation="1">
      <v-card-text>
        <div class="d-flex align-center justify-content-between">
        <h6 class="font-weight-bold mb-0">Details</h6>
        <v-btn link :to="{ name: 'EditVehicleDetails', params: { vehicleID: vehicle.id }}" color="" depressed outlined x-small>
          <v-icon small left>mdi-pencil</v-icon> Edit
        </v-btn>
        </div>
        <v-divider class="mt-2"></v-divider>
        <div>
          <v-row>
            <v-col class="py-0 text-right" cols="6" md="6">
              <div class="text-muted">Name</div>
            </v-col>
            <v-col class="py-0 justify-end" cols="6" md="6">
              <div>{{ vehicle.name  ? vehicle.name : ''}}</div>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row>
            <v-col class="py-0 text-right" cols="6" md="6">
              <div class="text-muted">Group</div>
            </v-col>
            <v-col class="py-0 justify-end" cols="6" md="6">
              <div>{{ vehicle.VehicleClassification.groupId ? vehicle.VehicleClassification.groupId : '' }}</div>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row>
            <v-col class="py-0 text-right" cols="6" md="6">
              <div class="text-muted">Operator</div>
            </v-col>
            <v-col class="py-0 justify-end" cols="6" md="6">
              <div>{{ vehicle.VehicleClassification.operatorAccountId ? vehicle.VehicleClassification.operatorAccountId : ''}}</div>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row>
            <v-col class="py-0 text-right" cols="6" md="6">
              <div class="text-muted">Type</div>
            </v-col>
            <v-col class="py-0 justify-end" cols="6" md="6">
              <div>{{ vehicle.vehicleTypeId ? vehicle.vehicleTypeId : '' }}</div>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row>
            <v-col class="py-0 text-right" cols="6" md="6">
              <div class="text-muted">Status</div>
            </v-col>
            <v-col class="py-0 justify-end" cols="6" md="6">
              <div>{{ vehicle.VehicleClassification.vehicleStatusId ? vehicle.VehicleClassification.vehicleStatusId : ''}}</div>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row>
            <v-col class="py-0 text-right" cols="6" md="6">
              <div class="text-muted">VIN/SN</div>
            </v-col>
            <v-col class="py-0 justify-end" cols="6" md="6">
              <div>{{ vehicle.vin ? vehicle.vin : '' }}</div>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row>
            <v-col class="py-0 text-right" cols="6" md="6">
              <div class="text-muted">License Plate</div>
            </v-col>
            <v-col class="py-0 justify-end" cols="6" md="6">
              <div>{{vehicle.licensePlate ? vehicle.licensePlate : ''}} </div>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row>
            <v-col class="py-0 text-right" cols="6" md="6">
              <div class="text-muted">Year</div>
            </v-col>
            <v-col class="py-0 justify-end" cols="6" md="6">
              <div>{{ vehicle.year ? vehicle.year : '' }}</div>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row>
            <v-col class="py-0 text-right" cols="6" md="6">
              <div class="text-muted">Make</div>
            </v-col>
            <v-col class="py-0 justify-end" cols="6" md="6">
              <div>fjkjdsf</div>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row>
            <v-col class="py-0 text-right" cols="6" md="6">
              <div class="text-muted">Model</div>
            </v-col>
            <v-col class="py-0 justify-end" cols="6" md="6">
              <div>{{ vehicle.VehicleClassification.vehicleModelId ? vehicle.VehicleClassification.vehicleModelId : '' }}</div>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row>
            <v-col class="py-0 text-right" cols="6" md="6">
              <div class="text-muted">Trim</div>
            </v-col>
            <v-col class="py-0 justify-end" cols="6" md="6">
              <div>{{ vehicle.trim ? vehicle.trim : '' }}</div>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row>
            <v-col class="py-0 text-right" cols="6" md="6">
              <div class="text-muted">Registration Region</div>
            </v-col>
            <v-col class="py-0 justify-end" cols="6" md="6">
              <div>{{ vehicle.registrationRegion ? vehicle.registrationRegion : '' }}</div>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row>
            <v-col class="py-0 text-right" cols="6" md="6">
              <div class="text-muted">Color</div>
            </v-col>
            <v-col class="py-0 justify-end" cols="6" md="6">
              <div>{{ vehicle.VehicleAdditionalDetail.color ? vehicle.VehicleAdditionalDetail.color : '' }}</div>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row>
            <v-col class="py-0 text-right" cols="6" md="6">
              <div class="text-muted">Ownership</div>
            </v-col>
            <v-col class="py-0 justify-end" cols="6" md="6">
              <div>{{ vehicle.VehicleClassification.ownership ? vehicle.VehicleClassification.ownership : ''}}</div>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row>
            <v-col class="py-0 text-right" cols="6" md="6">
              <div class="text-muted">Body Type</div>
            </v-col>
            <v-col class="py-0 justify-end" cols="6" md="6">
              <div>{{ vehicle.VehicleAdditionalDetail.bodyType ? vehicle.VehicleAdditionalDetail.bodyType : '' }}</div>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row>
            <v-col class="py-0 text-right" cols="6" md="6">
              <div class="text-muted">Body Subtype</div>
            </v-col>
            <v-col class="py-0 justify-end" cols="6" md="6">
              <div>{{ vehicle.VehicleAdditionalDetail.bodySubtype ? vehicle.VehicleAdditionalDetail.bodySubtype : '' }}</div>
            </v-col>
          </v-row>
          <v-divider></v-divider>

          <v-row>
            <v-col class="py-0 text-right" cols="6" md="6">
              <div class="text-muted">MSRP</div>
            </v-col>
            <v-col class="py-0 justify-end" cols="6" md="6">
              <div>{{ vehicle.VehicleAdditionalDetail.msrp ? vehicle.VehicleAdditionalDetail.msrp : '' }}</div>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row>
            <v-col class="py-0 text-right" cols="6" md="6">
              <div class="text-muted">
                <v-icon x-small>mdi-link</v-icon>
                Linked Vehicles</div>
            </v-col>
            <v-col class="py-0 justify-end" cols="6" md="6">
              <div>fjkjdsf</div>
            </v-col>
          </v-row>
          <v-divider></v-divider>
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
