<template>
  <div>
    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="12" md="12" lg="12" class="pt-0">
    <v-card elevation="0" outlined rounded="3">
      <v-card-title class="font-weight-bold">
    Identification
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12" md="12" class="pb-0">
              <label>Vehicle Name <strong class="text--error">*</strong></label>
              <v-text-field
              v-model="form.name"
              :loading="checkingVehicle"
              @blur="checkVehicleName"
              :rules="[required('Vehicle Name')]"
              hint="Enter a nickname to distinguish this vehicle in Fleetgh."
              persistent-hint
              dense
              outlined
              >
              <template v-slot:append>
                <v-icon v-if="vehicleNameExist === false" color="success">mdi-check-circle</v-icon>
                <v-icon v-if="vehicleNameExist === true" color="red">mdi-close</v-icon>
              </template>
              </v-text-field>
        </v-col>
        <v-col cols="12" md="12" class="pb-0 pt-0">
              <label>VIN/SN</label>
              <v-text-field
              v-model="form.vin"
              dense
              outlined
              hint="Vehicle Identification Number or Serial Number."
              persistent-hint
              >
              </v-text-field>
        </v-col>
        <v-col cols="12" md="12" class="pb-0 pt-0">
              <label>License Plate</label>
              <v-text-field
              v-model="form.licensePlate"
              dense
              outlined
              hint="Vehicle Identification Number or Serial Number."
              persistent-hint
              >
              </v-text-field>
        </v-col>
        <v-col cols="12" class="pb-0 pt-0">
              <label>Type<strong class="text--error">*</strong></label>
              <v-select
              v-model="form.vehicleTypeId"
              hint="Categorize this vehicle"
              persistent-hint
              :items="vehicleTypes"
              item-text="name"
              item-value="id"
              dense
              outlined
              >
              </v-select>
        </v-col>
        <v-col cols="12" class="pb-0 pt-0">
              <label>Year</label>
              <v-text-field
              type="number"
              v-model="form.year"
              dense
              hint="e.g. 1999, 2012, etc."
              persistent-hint
              outlined
              >
              </v-text-field>
        </v-col>
        <v-col cols="12" class="pb-0 pt-0">
              <label>Make</label>
              <v-autocomplete
              v-model="form.vehicleMakeId"
              :items="groups"
              clearable
              name="makeId"
              hint="e.g. Toyota, GMC, Chevrolet, etc."
              persistent-hint
              item-text="name"
              item-value="id"
              dense
              outlined
              >
              <template v-slot:no-data>
                <v-list-item>
                  <v-btn color="primary" block @click="addnewItem('makeId', 'allGroups', 'ADD_NEW_GROUP')" text>
                    <v-icon left>mdi-plus</v-icon>
                    Create New
                  </v-btn>
                </v-list-item>
              </template>
              </v-autocomplete>
        </v-col>
        <v-col cols="12" class="pb-0 pt-0">
              <label>Model</label>
              <v-autocomplete
              v-model="form.vehicleModelId"
              :items="allVehicleModels"
              hint="e.g. 4Runner, Yukon, Silverado, etc."
              persistent-hint
              item-text="name"
              item-value="id"
              name="modelId"
              dense
              outlined
              > <template v-slot:no-data>
                <v-list-item>
                  <v-btn color="primary" block @click="addnewItem('modelId', 'allVehicleModels', 'ADD_VEHICLE_MODEL')" text>
                    <v-icon left>mdi-plus</v-icon>
                    Create New
                  </v-btn>
                </v-list-item>
              </template>
              </v-autocomplete>
        </v-col>
        <v-col cols="12" class="pb-0 pt-0">
              <label>Trim</label>
              <v-text-field
              v-model="form.trim"
              hint="e.g. SE, LE, XLE, etc."
              persistent-hint
              dense
              outlined
              >
              </v-text-field>
        </v-col>
        <v-col cols="12" class="pb-0 pt-0">
              <label>Registration Slate/Province</label>
              <v-text-field
              v-model="form.registrationRegion"
              dense
              outlined
              >
              </v-text-field>
        </v-col>
        <v-col cols="12" class="pt-0">
          <label>Photo</label>
          <!-- <v-row>
            <v-col cols="12" md="6" class=""> -->
          <v-file-input
          id="fileInput"
            v-show="false"
            accept="image/*"
            label="File input"
          >
          </v-file-input>
            <div class="image-area no-image" align="center">
          <v-btn @click="triggerUpload" x-small depressed color="success" class="mt-8">Pick file
          </v-btn>
              <v-img></v-img>
            </div>
          <!-- <v-btn @click="triggerUpload" small depressed color="success">Pick file
          </v-btn> -->
            <!-- </v-col>
          </v-row> -->
        </v-col>
      </v-row>
    </v-card-text>
    </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import common from '../../../mixins/common'
import vehicles from '../../../mixins/vehicles'
import validation from '../../../services/validation'
export default {
  name: 'Identification',
  props: ['form'],
  mixins: [common, vehicles],
  data () {
    return {
      ...validation,
      checkingVehicle: false,
      vehicleNameExist: null
    }
  },
  methods: {
    addnewItems (name, store, dispatch) {
      this.$store.dispatch(`${store}/${dispatch}`, name)
      // const length = this.$store.state.users[`${store}`].length
      // const value = document.querySelector(`input[name=${name}]`).value
      // console.log(value)
      // const newItem = {
      //   id: length,
      //   name: value
      // }
      // console.log(newItem)
      // this.$store.commit(`users/${commit}`, newItem)
      // document.querySelector(`input[name=${name}]`).value = newItem.name
      // this.form.makeId = newItem.id
    },
    async checkVehicleName () {
      if (this.form.name === '') return
      this.checkingVehicle = true
      const response = await this.$store.dispatch('vehicles/checkVehicleName', { name: this.form.name })
      if (response === true) {
        this.checkingVehicle = false
        this.vehicleNameExist = true
      } else if (response === false) {
        this.checkingVehicle = false
        this.vehicleNameExist = false
      } else if (response === null) {
        this.checkingVehicle = false
        this.$store.dispatch('showSnackBar', { error: true, message: 'Error checking vehicle name' })
      }
    },
    triggerUpload () {
      document.getElementById('fileInput').click()
    }

  }

}
</script>

<style scoped>
.v-label {
  color: black !important;
}
.v-input--selection-controls  {
  margin-top: 0 !important;
}
.image-area {
  height: 6rem;
  border-radius: 10px;
  width: 6rem;

}
.no-image {
  background-color: #f9f9f9;
  border: grey dashed 2px;
}

</style>
