<template>
  <div>
    <v-sheet class="grey lighten-2">
    <v-container>
      <v-row justify="center" align="center">
        <v-col cols="12" md="6" class="pa-0 order-sm-2">
          <v-card class="pa-4 rounded-bl-0 rounded-tl-0" flat>
            <v-card-title class="pt-0">Upload File
              <div class="close ml-auto">
                <slot name="close"/>
              </div>
            </v-card-title>
            <v-divider class="mt-0"></v-divider>
            <v-card-text>
              <v-form ref="groupForm">
              <div>
                <label>File Name <strong>*</strong></label>
                <v-text-field :rules="[required('File Name')]" dense outlined
                v-model="form.name"
                >
                </v-text-field>
                <v-img hidden :src="form.url"></v-img>
              </div>
              <div>
                <label>Vehicle:</label>
                <vehicle-item
                class="px-0"
                :name="vehicle.name"
                :vehicleStatusId="vehicle.VehicleClassification.vehicleStatusId"
                :vehicleGroupId="vehicle.vehicleGroupId"
                :photo="vehicle.photo"
                >

                </vehicle-item>
              </div>
              <div>
                <label>Uploaded By:</label>
                <user-item :user="getUser(form.uploadedBy)"></user-item>

              </div>
              </v-form>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions class="text-right">
              <slot name="action">
                <div class="d-flex justify-content-between">
                  <div>
                    <v-btn color="primary" text @click="cancelUpload">
                      Cancel
                    </v-btn>
                  </div>
                  <div>
                    <v-btn :disabled="uploading" depressed color="primary" @click="saveOption">
                      {{ uploading ? "Uploading..." : "Upload"}}
                    </v-btn>
                  </div>
                </div>
                </slot>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="12" md="6" >
              <div v-if="type === 'photo'">
                <v-card flat>
                <v-img positon="center" width="100%" :lazy-src="defaultVehicle" :src="form.url ? form.url : defaultVehicle">
                </v-img>
                  </v-card>
                </div>
                <div v-else>
                  <v-card height="300" color="grey elevation-0 lighten-1">
                    <v-row justify="center" align="center">
                      <v-col cols="12" class="align-self-center">
                    <div v-if="form.url" align="center" class="my-auto">
                      Document Uploaded
                    </div>
                      </v-col>
                    </v-row>
                  </v-card>
                </div>
                  <div class="pt-4" align="center">
                    <v-btn @click="changeFile" small text color="primary"> Change File</v-btn>
                  </div>
        </v-col>
      </v-row>
    </v-container>
    </v-sheet>
  </div>
</template>

<script>
import common from '../../mixins/common'
import user from '../../mixins/user'
import vehicles from '../../mixins/vehicles'
import validation from '../../services/validation'
import UserItem from './UserItem.vue'
export default {
  components: { UserItem },
  name: 'FileUploader',
  props: ['form', 'editMode', 'vehicleUpload', 'type'],
  mixins: [user, common, vehicles],
  data () {
    return {
      ...validation,
      uploading: false
    }
  },
  computed: {
    vehicleImage () {
      return {
        name: this.form.name,
        vehicleId: this.vehicleUpload ? this.vehicle.id : null,
        type: this.type,
        uploadedBy: this.form.uploadedBy,
        url: this.form.url,
        fileOwnerId: this.vehicleUpload ? null : this.form.fileOwnerId
      }
    }
  },
  methods: {
    changeFile () {
      this.$emit('change-file')
    },
    saveOption () {
      if (this.editMode) {
        this.updateFile()
      } else {
        this.addFile()
      }
    },
    async addFile () {
      this.uploading = true
      const response = await this.$store.dispatch('files/addFile', this.vehicleImage)
      if (response === 'success') {
        this.uploading = false
        this.$store.dispatch('showSnackBar', { error: false, message: 'File added successfully!' })
        this.$emit('close-dialog')
      } else {
        console.log(response)
      }
    },
    cancelUpload () {
      // this.form.reset()
      // this.form.resetValidation()
      this.$emit('close-dialog')
    }
  }

}
</script>

<style>

</style>
