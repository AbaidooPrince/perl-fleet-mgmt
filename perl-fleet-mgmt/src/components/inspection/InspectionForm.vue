<template>  <div>
    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="12" md="8" lg="8">
    <v-card class="pa-4" elevation="0" outlined rounded="3">
      <v-card-title class="font-weight-bold">
    Select Vehicle
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12" md="12" class="pb-0">
              <label>Vehicle <strong class="text--error">*</strong></label>
              <v-autocomplete
              clearable
              v-model="form.vehicleId"
              :items="allVehicles"
              item-text="name"
              item-value="id"
              dense
              outlined
              >
              <template v-slot:selection="{ item }">
                <span>
                    <v-badge :color="item.color" offset-x="-10" inline class="mr-1" dot></v-badge>
                    {{ item.name }}
                </span>
      </template>
              <template v-slot:item="{item, attrs, on}">
                <v-list-item v-on="on" v-bind="attrs">
                  <v-list-item-title>
                    <v-badge :color="item.color" offset-x="-10" inline class="mr-1" dot></v-badge>
                    {{ item.name }}
                  </v-list-item-title>
                </v-list-item>
              </template>
              </v-autocomplete>
        </v-col>
        <v-col cols="12" class="px-0 py-0">
      <v-card-title class="font-weight-bold black--text pt-0">
    Item Checklist
    </v-card-title>
        </v-col>
        <v-col class="pt-0 pb-0" cols="12" md="12" v-for="(item, i) in form.checkList" :key="i+'item'">
          <label class="font-weight-bold">{{ item.name }}
            <span>
              <v-icon :color="item.status === true ? 'success' : item.status === false ? 'error' : 'white'">mdi-{{ item.status === true ? 'check' : 'close' }}</v-icon>
            </span>
          </label>
          <v-radio-group :disabled="form.vehicleId === null" row v-model="item.status">
            <v-radio label="Pass" :value="true">
            </v-radio>
            <v-radio label="Fail" :value="false">
            </v-radio>
          </v-radio-group>
          <!-- <v-spacer></v-spacer> -->
          <v-textarea placeholder="Add optional comment..." :disabled="form.vehicleId === null" outlined dense rows="2" row-height="1" v-model="item.comment" >
          </v-textarea>
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
  name: 'InspectionForm',
  props: ['form'],
  data () {
    return {
      ...validation
    }
  },
  computed: {
    allVehicles: {
      get () {
        return this.$store.state.vehicles.vehicles
      }
    }
  }
}
</script>

<style>

</style>
