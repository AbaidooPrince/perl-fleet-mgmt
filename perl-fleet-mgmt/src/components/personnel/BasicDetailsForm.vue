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
              dense
              outlined
              >
              </v-text-field>
        </v-col>
        <v-col cols="12" class="pb-0 pt-0">
              <label>Middle Name</label>
              <v-text-field
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
              <v-text-field
              dense
              outlined
              >
              </v-text-field>
        </v-col>
        <v-col cols="12" class="pt-0">
          <label>Profile Image</label>
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
import validation from '../../services/validation'
export default {
  name: 'BasicDetailsForm',
  props: ['form'],
  data () {
    return {
      ...validation,
      checkingEmail: false,
      emailExist: null
    }
  },
  methods: {
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
