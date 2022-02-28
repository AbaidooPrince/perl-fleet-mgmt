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
              v-model="form.email"
              :rules="[required('Email'), validEmail()]"
              persistent-hint
              hint="If this Contact is granted user access, email notifications will be sent here"
              dense
              outlined
              >
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
        <v-col cols="12" class="pb-0 pt-0">
          <label>Profile Image</label>
          <v-file-input
            accept="image/*"
            label="File input"
          >
          <template v-slot:prepend={ prepend }>
            <v-btn>
              Pick File
            </v-btn>
          </template>
          </v-file-input>
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
      ...validation
    }
  }

}
</script>

<style>

</style>
