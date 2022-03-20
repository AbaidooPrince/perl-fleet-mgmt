<template>
  <div>
    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="12" md="12" lg="12" class="pt-0">
    <v-card elevation="0" outlined rounded="3">
      <v-card-title class="font-weight-bold">
    Maintenance Schedule
    </v-card-title>
    <v-card-text class="pb-0">
    <h5 class="mb-0">
      Choose a Service Program
    </h5>
      <small>Service Programs automatically manage Service Reminders for Vehicles that share common preventative maintenance needs.</small>
    </v-card-text>
    <v-card-text class="w-100">
      <v-btn-toggle mandatory class="" v-model="form.maintenance">
        <template v-slot:default>
          <v-row>
            <v-col cols="12" md="8" sm="8">
              <v-btn elevation="1"  block :color="form.maintenance === 0 ? 'primary lighten-3' : ''" outlined class="rounded-lg justify-content-start">
                <template v-slot:default>
                  <div class="d-flex justify-content-between">
                  <v-icon v-if="form.maintenance === 0" color="primary" left>mdi-radiobox-marked</v-icon>
                  <v-icon  v-else color="grey" left >mdi-radiobox-blank</v-icon>
                  <span>None
                  </span>
                    </div>
                </template>
                </v-btn>
                <small>No Service Reminders will be created</small>
            </v-col>
            <v-col cols="12" md="8" sm="8">
              <v-btn elevation="1" outlined block :color="form.maintenance === 1 ? 'primary lighten-3' : ''" class="rounded-lg justify-content-start">
                <template v-slot:default>
                  <div class="d-flex justify-content-between">
                  <v-icon v-if="form.maintenance === 1" color="primary" left>mdi-radiobox-marked</v-icon>
                  <v-icon  v-else color="grey" left >mdi-radiobox-blank</v-icon>
                  <span>Chose an existing Service Program
                  </span>
                    </div>
                </template>
                </v-btn>
                <div class="w-50 pa-4" v-if="form.maintenance === 1">
              <v-select
              v-model="form.type"
              placeholder="Select type"
              :items="groups"
              item-text="name"
              item-value="id"
              dense
              outlined
              >
              </v-select>
                </div>
            </v-col>
          </v-row>
        </template>
      </v-btn-toggle>
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
  name: 'VehicleMaintenanceForm',
  props: ['form'],
  mixins: [common],
  data () {
    return {
      ...validation
    }
  },
  computed: {
    defaultM: {
      get () {
        return this.form.maintenance === 0
      }
    }
  }

}
</script>

<style scoped>
.active-maintenance {
  color: blue;
  border-radius: 10px !important;
  border: solid 4px blue !important;

}
</style>
