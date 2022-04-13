<template>
  <div>
    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="12" md="8" lg="8">
    <v-card elevation="0" outlined rounded="3">
      <v-card-title class="font-weight-bold">
    Basic Details
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12" md="6" class="pb-0">
              <label>First Name <strong class="text--error">*</strong></label>
              <v-text-field
              v-model="form.firstName"
              :rules="[required('First Name')]"
              dense
              outlined
              >
              </v-text-field>
        </v-col>
        <v-col cols="12" md="6" class="pb-0">
              <label>Last Name</label>
              <v-text-field
              v-model="form.lastName"
              dense
              outlined
              >
              </v-text-field>
        </v-col>
        <v-col cols="12" class="pb-0 pt-0">
              <label>Middle Name</label>
              <v-text-field
              v-model="form.middleName"
              dense
              outlined
              >
              </v-text-field>
        </v-col>
        <v-col cols="12" class="pb-0 pt-0">
              <label>Email <strong class="text--error">*</strong></label>
              <v-text-field
              @blur="checkEmail"
              :loading="checkingEmail"
              v-model="form.email"
              :rules="[required('Email'), validEmail()]"
              persistent-hint
              hint="If this Contact is granted user access, email notifications will be sent here"
              dense
              outlined
              >
              <template v-slot:append>
                <v-icon v-if="emailExist === true" color="success">mdi-check-circle
                </v-icon>
                <v-icon v-if="emailExist === false" color="error">mdi-close-circle
                </v-icon>
              </template>
              </v-text-field>
        </v-col>
        <v-col cols="12" class="pb-0 pt-0">
              <label>Group</label>
              <v-select
              v-model="form.groupId"
              :items="groups"
              item-text="name"
              item-value="id"
              dense
              outlined
              >
              </v-select>
        </v-col>
        <v-col cols="12" class="pt-0">
          <label>Profile Image</label>
          <!-- <v-row>
            <v-col cols="12" md="6" class=""> -->
          <input
          id="fileInput"
            v-show="false"
            @change="uploadToServer"
            accept="image/*"
            label="File input"
            type="file"
          />
            <div :class="form.profileImage !== '' ? '' : 'no-image' " class="image-area" align="center">
          <v-btn v-if="form.profileImage === ''" @click="triggerUpload" x-small depressed color="success" class="mt-8">Pick file
          </v-btn>
              <v-img :lazy-src="form.profileImage" class="rounded-lg" height="100%" v-if="form.profileImage || uploading" :src="form.profileImage" >
                <template v-slot:placeholder>
                  <v-progress-circular color="primary" :loading="uploading" intermediate>
                  </v-progress-circular>
                </template>
              </v-img>
              <uploader></uploader>
            </div>
          <!-- <v-btn @click="triggerUpload" small depressed color="success">Pick file
          </v-btn> -->
            <!-- </v-col>
          </v-row> -->
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row>
        <v-col cols="12" class="pa-0">
        <v-card-title class=" pb-0 text-dark font-weight-bold">Classifications</v-card-title>
        </v-col>
        <v-col cols="12" md="6" class="pt-0">
          <v-checkbox  dense persistent-hint label="Operator" hint="Allow this Contact to be assigned to assets" v-model="form.operator">
          </v-checkbox>
        </v-col>
        <v-col cols="12" md="6" class="pt-0">
          <v-checkbox  dense persistent-hint label="Employee" hint="Current or former employee, for identification purposes only" v-model="form.employee">
          </v-checkbox>
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
import common from '../../mixins/common'
import validation from '../../services/validation'
export default {
  name: 'BasicDetailsForm',
  props: ['form'],
  mixins: [common],
  data () {
    return {
      files: [],
      uploading: false,
      ...validation,
      checkingEmail: false,
      emailExist: null
    }
  },
  methods: {
    async uploadToServer (e) {
      this.uploading = true
      // var fileInput = document.getElementById('fileInput')
      var fileList = e.target.files[0]
      console.log('fileInpue', fileList)

      // this.uploadProgress = truedispatch
      // for (var i = 0; i < fileList.length; ++i) {
      const form = new FormData()
      form.append('file', fileList)
      const response = await this.$store.dispatch('uploadFile', form)
      if (response) {
        this.$emit('set-file-url', response)
        this.uploading = false
      }
      console.log(response)
      // this.upload = true;
      // this.uploading = true;
      // this.$store.dispatch('uploadFile', form).then((response) => {
      //   if (response.data.message === 'Uploaded') {
      //   //
      //   }
      // }).catch(() => {

      // })
      // if (i === (fileList.length - 1)) {
      //   this.uploading = false
      // }
      // }
    },
    async checkEmail () {
      if (this.form.email === '') return
      this.checkingEmail = true
      const response = await this.$store.dispatch('users/checkEmail', { email: this.form.email })
      if (response === true) {
        this.checkingEmail = false
        this.emailExist = true
      } else if (response === false) {
        this.checkingEmail = false
        this.emailExist = false
      } else if (response === null) {
        this.checkingEmail = false
        this.$store.dispatch('showSnackBar', { error: true, message: 'Error checking email' })
      }
    },
    triggerUpload () {
      document.getElementById('fileInput').click()
    }

  }

}
</script>

<style scoped>
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
